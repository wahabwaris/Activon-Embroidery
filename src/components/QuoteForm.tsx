"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, FileUp, Loader2, X } from "lucide-react";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import PatchArt from "./PatchArt";
import { getProduct, type ProductKey, type ShapeKey } from "@/lib/catalog";
import { countries } from "@/lib/countries";
import {
  ALLOWED_EXT,
  MAX_FILE_MB,
  backingOptions,
  productOptions,
  shapeOptions,
  validateQuote,
  type QuoteInput,
} from "@/lib/quote-schema";

type Props = {
  defaultProduct?: ProductKey;
  lockProduct?: boolean;
  defaults?: Partial<QuoteInput>;
  id?: string;
};

const empty: QuoteInput = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  product: "",
  quantity: "",
  width: "",
  height: "",
  unit: "in",
  shape: "",
  backing: "",
  border: "",
  colours: "",
  message: "",
};

type Errs = Partial<Record<keyof QuoteInput | "file", string>>;
const FormCtx = createContext<{ id: string; errors: Errs }>({ id: "", errors: {} });

function F({ name, label, children, optional }: { name: keyof QuoteInput | "file"; label: string; children: React.ReactNode; optional?: boolean }) {
  const { id, errors } = useContext(FormCtx);
  return (
    <div>
      <label htmlFor={`${id}-${name}`} className="label">
        {label} {optional ? <span className="normal-case tracking-normal text-silver-500">(optional)</span> : <span className="text-brand-400">*</span>}
      </label>
      {children}
      {errors[name] && <p className="mt-1.5 text-xs text-brand-400" role="alert">{errors[name]}</p>}
    </div>
  );
}

export default function QuoteForm({ defaultProduct, lockProduct, defaults, id = "quote-form" }: Props) {
  const [data, setData] = useState<QuoteInput>({ ...empty, ...defaults, product: defaultProduct || defaults?.product || "" });
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteInput | "file", string>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const startedAt = useRef(Date.now());
  const fileInput = useRef<HTMLInputElement>(null);

  const product = data.product ? getProduct(data.product as ProductKey) : null;
  const borders = product?.borders ?? ["Merrowed border", "Hot-cut / laser-cut edge"];

  const set = (k: keyof QuoteInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const previewShape = (data.shape || "circle") as ShapeKey;
  const previewType = (data.product || "embroidered") as ProductKey;
  const palette = useMemo(() => getProduct(previewType).art.palette, [previewType]);

  function pickFile(f: File | null) {
    if (!f) return setFile(null);
    const ext = f.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXT.includes(ext)) {
      setErrors((e) => ({ ...e, file: `Allowed formats: ${ALLOWED_EXT.join(", ").toUpperCase()}` }));
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, file: `File must be under ${MAX_FILE_MB} MB.` }));
      return;
    }
    setErrors((e) => ({ ...e, file: undefined }));
    setFile(f);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validateQuote(data);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = Object.keys(v)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    Object.entries(data).forEach(([k, val]) => fd.set(k, val));
    fd.set("elapsed", String(Date.now() - startedAt.current));
    if (file) fd.set("design", file);
    else fd.delete("design");
    try {
      const res = await fetch("/api/quote/", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.message || "Something went wrong. Please try again or email us directly.");
      }
      setStatus("done");
      setServerMsg(json.reference || "");
      if (typeof window !== "undefined" && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", "generate_lead", { product: data.product });
      }
    } catch (err) {
      setStatus("error");
      setServerMsg((err as Error).message);
    }
  }

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center md:p-16">
        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.1 }}>
          <CheckCircle2 className="mx-auto h-16 w-16 text-brand-400" />
        </motion.div>
        <h3 className="h-display mt-6 text-4xl text-white">Thank you – inquiry received!</h3>
        <p className="mx-auto mt-4 max-w-lg text-silver-300">
          We&apos;ve received your quotation request{serverMsg ? <> (reference <strong className="text-white">{serverMsg}</strong>)</> : null}. A confirmation has been sent to{" "}
          <strong className="text-white">{data.email}</strong>. Our team will review your design and reply with a quotation shortly.
        </p>
        <button
          type="button"
          className="btn-ghost mt-8"
          onClick={() => {
            setData({ ...empty, product: defaultProduct || "" });
            setFile(null);
            setStatus("idle");
            startedAt.current = Date.now();
          }}
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <FormCtx.Provider value={{ id, errors }}>
    <form id={id} onSubmit={onSubmit} noValidate className="grid gap-8 lg:grid-cols-12" encType="multipart/form-data">
      {/* Live preview */}
      <aside className="lg:col-span-4">
        <div className="card sticky top-28 overflow-hidden p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-silver-500">Live patch preview</p>
          <div className="relative mx-auto mt-4 aspect-square w-full max-w-[280px]">
            <div className="absolute inset-10 rounded-full bg-brand/25 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={previewType + previewShape}
                initial={{ opacity: 0, rotate: -12, scale: 0.85 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 12, scale: 0.85 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full w-full"
              >
                <PatchArt type={previewType} shape={previewShape} palette={palette} subtitle={previewType.toUpperCase()} className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
          <dl className="mt-6 grid gap-2 text-sm">
            {[
              ["Patch type", productOptions.find((p) => p.value === data.product)?.label],
              ["Shape", shapeOptions.find((s) => s.value === data.shape)?.label],
              ["Size", data.width && data.height ? `${data.width} × ${data.height} ${data.unit}` : ""],
              ["Quantity", data.quantity],
              ["Backing", backingOptions.find((b) => b.value === data.backing)?.label],
              ["Border", data.border],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                <dt className="text-silver-500">{k}</dt>
                <dd className="text-right text-white">{v || "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-[11px] leading-relaxed text-silver-500">Illustration only. Your final artwork proof is shared for approval before production.</p>
        </div>
      </aside>

      <div className="grid gap-6 lg:col-span-8">
        {/* honeypot */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <fieldset className="card grid gap-5 p-6 sm:grid-cols-2 md:p-8">
          <legend className="sr-only">Your details</legend>
          <p className="font-display text-xl uppercase text-white sm:col-span-2">1. Your details</p>
          <F name="fullName" label="Full Name">
            <input id={`${id}-fullName`} className="field" value={data.fullName} onChange={set("fullName")} autoComplete="name" />
          </F>
          <F name="company" label="Company / Brand Name" optional>
            <input id={`${id}-company`} className="field" value={data.company} onChange={set("company")} autoComplete="organization" />
          </F>
          <F name="email" label="Email Address">
            <input id={`${id}-email`} type="email" className="field" value={data.email} onChange={set("email")} autoComplete="email" />
          </F>
          <F name="phone" label="WhatsApp / Phone Number">
            <input id={`${id}-phone`} type="tel" className="field" placeholder="+1 555 123 4567" value={data.phone} onChange={set("phone")} autoComplete="tel" />
          </F>
          <div className="sm:col-span-2">
            <F name="country" label="Country">
              <input id={`${id}-country`} list={`${id}-countries`} className="field" value={data.country} onChange={set("country")} autoComplete="country-name" />
              <datalist id={`${id}-countries`}>
                {countries.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </F>
          </div>
        </fieldset>

        <fieldset className="card grid gap-5 p-6 sm:grid-cols-2 md:p-8">
          <legend className="sr-only">Patch specification</legend>
          <p className="font-display text-xl uppercase text-white sm:col-span-2">2. Patch specification</p>

          <div className="sm:col-span-2">
            <F name="product" label="Product Category">
              <div id={`${id}-product`} tabIndex={-1} role="radiogroup" className="grid gap-3 sm:grid-cols-3">
                {productOptions.map((p) => (
                  <label
                    key={p.value}
                    className={`relative flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                      data.product === p.value ? "border-brand bg-brand/10 text-white" : "border-white/10 text-silver-300 hover:border-white/30"
                    } ${lockProduct && data.product !== p.value ? "opacity-40" : ""}`}
                  >
                    <input
                      type="radio"
                      name="product-radio"
                      value={p.value}
                      checked={data.product === p.value}
                      onChange={() => {
                        setData((d) => ({ ...d, product: p.value, border: "" }));
                        setErrors((er) => ({ ...er, product: undefined }));
                      }}
                      className="sr-only"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </F>
          </div>

          <F name="quantity" label="Quantity Required">
            <input id={`${id}-quantity`} type="number" min={1} inputMode="numeric" className="field" placeholder="e.g. 500" value={data.quantity} onChange={set("quantity")} />
          </F>
          <F name="shape" label="Preferred Shape">
            <select id={`${id}-shape`} className="field" value={data.shape} onChange={set("shape")}>
              <option value="">Select a shape</option>
              {shapeOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </F>
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 sm:col-span-2">
            <F name="width" label="Patch Width">
              <input id={`${id}-width`} type="number" min={0} step="0.1" inputMode="decimal" className="field" value={data.width} onChange={set("width")} />
            </F>
            <F name="height" label="Patch Height">
              <input id={`${id}-height`} type="number" min={0} step="0.1" inputMode="decimal" className="field" value={data.height} onChange={set("height")} />
            </F>
            <div>
              <label htmlFor={`${id}-unit`} className="label">Unit</label>
              <select id={`${id}-unit`} className="field" value={data.unit} onChange={set("unit")}>
                <option value="in">inch</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <F name="backing" label="Preferred Backing">
              <div id={`${id}-backing`} tabIndex={-1} role="radiogroup" className="grid gap-3 sm:grid-cols-4">
                {backingOptions.map((b) => (
                  <label
                    key={b.value}
                    className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-center text-sm transition ${
                      data.backing === b.value ? "border-brand bg-brand/10 text-white" : "border-white/10 text-silver-300 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="backing-radio"
                      value={b.value}
                      checked={data.backing === b.value}
                      onChange={() => {
                        setData((d) => ({ ...d, backing: b.value }));
                        setErrors((er) => ({ ...er, backing: undefined }));
                      }}
                      className="sr-only"
                    />
                    {b.label}
                  </label>
                ))}
              </div>
            </F>
          </div>

          <F name="border" label="Border / Edge Finish" optional>
            <select id={`${id}-border`} className="field" value={data.border} onChange={set("border")}>
              <option value="">Not sure / advise me</option>
              {borders.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </F>
          <F name="colours" label="Thread / Artwork Colours" optional>
            <input id={`${id}-colours`} className="field" placeholder="e.g. Red, black, white or Pantone codes" value={data.colours} onChange={set("colours")} />
          </F>
        </fieldset>

        <fieldset className="card grid gap-5 p-6 md:p-8">
          <legend className="sr-only">Design and notes</legend>
          <p className="font-display text-xl uppercase text-white">3. Design &amp; requirements</p>
          <F name="file" label="Design / Logo Upload" optional>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                pickFile(e.dataTransfer.files?.[0] || null);
              }}
              className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-ink-900 px-6 py-8 text-center transition hover:border-brand/60"
            >
              <FileUp className="h-8 w-8 text-brand-400" />
              {file ? (
                <div className="flex items-center gap-3 text-sm text-white">
                  {file.name} <span className="text-silver-500">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                  <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ""; }} aria-label="Remove file" className="relative z-10 rounded-full p-1 hover:bg-white/10">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <p className="text-sm text-silver-300">
                  <span className="font-semibold text-white">Click to upload</span> or drag &amp; drop
                </p>
              )}
              <p className="text-xs text-silver-500">JPG, JPEG, PNG, PDF, AI, EPS, SVG · max {MAX_FILE_MB} MB</p>
              <input
                ref={fileInput}
                id={`${id}-file`}
                type="file"
                name="design-picker"
                accept=".jpg,.jpeg,.png,.pdf,.ai,.eps,.svg,image/*,application/pdf"
                className={`absolute inset-0 cursor-pointer opacity-0 ${file ? "pointer-events-none" : ""}`}
                onChange={(e) => pickFile(e.target.files?.[0] || null)}
              />
            </div>
          </F>
          <F name="message" label="Additional Requirements" optional>
            <textarea id={`${id}-message`} rows={5} className="field resize-y" placeholder="Deadline, packaging, private-label needs, delivery address city…" value={data.message} onChange={set("message")} />
          </F>

          {status === "error" && (
            <p className="rounded-xl border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-white" role="alert">
              {serverMsg}
            </p>
          )}

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-silver-500">By submitting you agree that we may contact you about this inquiry.</p>
            <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto disabled:opacity-60">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>Request My Quote</>
              )}
            </button>
          </div>
        </fieldset>
      </div>
    </form>
    </FormCtx.Provider>
  );
}
