import { ImageResponse } from "next/og";
import { promises as fs } from "fs";
import path from "path";

export const alt = "Activon Embroidery – Custom Patch Manufacturing for Brands Worldwide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const pub = path.join(process.cwd(), "public");
  const mark = await fs.readFile(path.join(pub, "brand/activon-mark.svg"));
  const markSrc = `data:image/svg+xml;base64,${mark.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d0d0f", color: "#fff", padding: 72, position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 10, background: "#e1251b" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={520} height={520} alt="" style={{ position: "absolute", right: -60, bottom: -40, opacity: 0.22 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={84} height={84} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: 6 }}>ACTIVON</span>
              <span style={{ fontSize: 17, letterSpacing: 12, color: "#a9adb5" }}>EMBROIDERY</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 74, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>Custom Patch Manufacturing</span>
            <span style={{ fontSize: 74, fontWeight: 900, lineHeight: 1.05, color: "#e1251b", textTransform: "uppercase" }}>for Brands Worldwide</span>
            <span style={{ marginTop: 28, fontSize: 28, color: "#c9ccd2" }}>Embroidered · Sublimation · Woven — Iron-On, Sew-On & Velcro Backing</span>
          </div>
          <span style={{ fontSize: 24, color: "#a9adb5" }}>Your Design. Our Craft. · Wholesale · OEM & Private Label · Worldwide Shipping</span>
        </div>
      </div>
    ),
    size
  );
}
