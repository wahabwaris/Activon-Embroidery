import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { listInquiries, updateStatus, type Inquiry } from "@/lib/store";

export const metadata: Metadata = { title: "Inquiry Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const statuses: Inquiry["status"][] = ["new", "contacted", "quoted", "closed"];

async function setStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as Inquiry["status"];
  if (statuses.includes(status)) await updateStatus(id, status);
  revalidatePath("/admin/");
}

export default async function Admin({ searchParams }: { searchParams: Promise<{ kind?: string; status?: string }> }) {
  const sp = await searchParams;
  const all = await listInquiries();
  const items = all.filter((i) => (!sp.kind || i.kind === sp.kind) && (!sp.status || i.status === sp.status));
  const count = (s: string) => all.filter((i) => i.status === s).length;

  const csv =
    "data:text/csv;charset=utf-8," +
    encodeURIComponent(
      ["Reference,Date,Type,Status,Name,Email,Phone,Country,Product,Quantity,Size,Backing"]
        .concat(
          all.map((i) =>
            [i.reference, i.createdAt, i.kind, i.status, i.fields["Full Name"] || i.fields.Name, i.fields.Email, i.fields["WhatsApp / Phone"], i.fields.Country, i.fields["Product Category"], i.fields.Quantity, i.fields.Size, i.fields.Backing]
              .map((v) => `"${String(v || "").replace(/"/g, '""')}"`)
              .join(",")
          )
        )
        .join("\n")
    );

  return (
    <section className="container pb-24 pt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="h-display mt-3 text-5xl text-white">Inquiry Dashboard</h1>
        </div>
        <a href={csv} download="activon-inquiries.csv" className="btn-ghost">Export CSV</a>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {statuses.map((s) => (
          <a key={s} href={`?status=${s}`} className={`card p-5 transition hover:border-brand/50 ${sp.status === s ? "border-brand" : ""}`}>
            <p className="text-xs uppercase tracking-wider text-silver-500">{s}</p>
            <p className="mt-2 font-display text-4xl text-white">{count(s)}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-sm">
        {[["All", "?"], ["Quotes", "?kind=quote"], ["Contact", "?kind=contact"]].map(([l, h]) => (
          <a key={l} href={h} className="rounded-full border border-white/15 px-4 py-1.5 text-silver-300 hover:border-white hover:text-white">{l}</a>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="card mt-8 p-10 text-center text-silver-300">No inquiries yet.</p>
      ) : (
        <ul className="mt-8 grid gap-4">
          {items.map((i) => (
            <li key={i.id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">
                    {i.fields["Full Name"] || i.fields.Name}{" "}
                    <span className="ml-2 rounded-full bg-brand/15 px-2 py-0.5 text-xs uppercase text-brand-400">{i.kind}</span>
                  </p>
                  <p className="text-xs text-silver-500">{i.reference} · {new Date(i.createdAt).toLocaleString("en-GB")}</p>
                </div>
                <form action={setStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={i.id} />
                  <select name="status" defaultValue={i.status} className="field !w-auto !py-2">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <button className="btn-dark !py-2 border border-white/15">Update</button>
                </form>
              </div>
              <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(i.fields).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className={k.includes("Requirements") || k === "Message" ? "sm:col-span-2 lg:col-span-3" : ""}>
                    <dt className="text-xs uppercase tracking-wider text-silver-500">{k}</dt>
                    <dd className="whitespace-pre-wrap text-silver-200">{k === "Email" ? <a className="text-brand-400" href={`mailto:${v}`}>{v}</a> : v}</dd>
                  </div>
                ))}
              </dl>
              {i.file && (
                <a href={`/api/admin/file/${i.file.storedName}`} className="btn-ghost mt-5 !py-2">
                  Download design ({(i.file.size / 1024).toFixed(0)} KB)
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
