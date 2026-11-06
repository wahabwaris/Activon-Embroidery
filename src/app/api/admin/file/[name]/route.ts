import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR, listInquiries } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  if (!/^[\w.-]+$/.test(name)) return new Response("Bad request", { status: 400 });
  const inquiry = (await listInquiries()).find((i) => i.file?.storedName === name);
  if (!inquiry?.file) return new Response("Not found", { status: 404 });
  const buf = await fs.readFile(path.join(UPLOAD_DIR, name)).catch(() => null);
  if (!buf) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${inquiry.file.originalName.replace(/[^\w.\- ]/g, "_")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
