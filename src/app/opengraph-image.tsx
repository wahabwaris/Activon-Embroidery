import { ImageResponse } from "next/og";
import { promises as fs } from "fs";
import path from "path";

export const alt = "Activon Embroidery – Custom Patch Manufacturing for Brands Worldwide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const pub = path.join(process.cwd(), "public");
  const logo = await fs.readFile(path.join(pub, "brand/activon-logo-transparent.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#101010", color: "#fff", fontFamily: "sans-serif", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 8, background: "#d4af72" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={860} height={381} alt="" />
        <span style={{ marginTop: 18, fontSize: 30, color: "#c5c5c5", letterSpacing: 2 }}>Custom Patch Manufacturing for Brands Worldwide</span>
        <span style={{ marginTop: 10, fontSize: 22, color: "#d4af72", letterSpacing: 4, textTransform: "uppercase" }}>Embroidered · Sublimation · Woven · Wholesale · OEM</span>
      </div>
    ),
    size
  );
}
