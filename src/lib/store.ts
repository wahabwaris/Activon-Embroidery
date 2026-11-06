import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Simple file-based inquiry store (data/inquiries.json + data/uploads/).
 * Works on any Node host / VPS. On serverless hosts with an ephemeral
 * filesystem (e.g. Vercel), swap these functions for a database
 * (Supabase, Neon, MongoDB…) – the rest of the app stays the same.
 */
const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "inquiries.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export type Inquiry = {
  id: string;
  reference: string;
  kind: "quote" | "contact";
  createdAt: string;
  status: "new" | "contacted" | "quoted" | "closed";
  fields: Record<string, string>;
  file?: { storedName: string; originalName: string; size: number; type: string };
  ip?: string;
};

async function ensure() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

export async function listInquiries(): Promise<Inquiry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return (JSON.parse(raw) as Inquiry[]).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

let queue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => undefined);
  return next;
}

export function saveInquiry(i: Omit<Inquiry, "id" | "reference" | "createdAt" | "status">) {
  return serial(async () => {
    await ensure();
    const all = await listInquiries();
    const now = new Date();
    const ref = `AE-${now.toISOString().slice(2, 10).replace(/-/g, "")}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    const item: Inquiry = { ...i, id: crypto.randomUUID(), reference: ref, createdAt: now.toISOString(), status: "new" };
    all.push(item);
    await fs.writeFile(FILE, JSON.stringify(all, null, 2));
    return item;
  });
}

export function updateStatus(id: string, status: Inquiry["status"]) {
  return serial(async () => {
    const all = await listInquiries();
    const it = all.find((x) => x.id === id);
    if (it) it.status = status;
    await fs.writeFile(FILE, JSON.stringify(all, null, 2));
    return it;
  });
}

export async function storeUpload(file: File) {
  await ensure();
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const storedName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, storedName), buf);
  return { storedName, originalName: file.name.slice(0, 200), size: file.size, type: file.type || "application/octet-stream", buffer: buf };
}
