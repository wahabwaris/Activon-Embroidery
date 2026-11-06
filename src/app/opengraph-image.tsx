import { ImageResponse } from "next/og";

export const alt = "Activon Embroidery – Custom Patch Manufacturing for Brands Worldwide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0d0d0f", color: "#fff", padding: 72, position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -120, top: -120, width: 560, height: 560, borderRadius: 9999, background: "rgba(225,37,27,0.35)", filter: "blur(80px)" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: 9999, border: "4px solid #a9adb5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 800 }}>A</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 4 }}>ACTIVON</span>
              <span style={{ fontSize: 16, letterSpacing: 10, color: "#a9adb5" }}>EMBROIDERY</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 76, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>Custom Patch Manufacturing</span>
            <span style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.05, color: "#e1251b", textTransform: "uppercase" }}>for Brands Worldwide</span>
            <span style={{ marginTop: 28, fontSize: 28, color: "#c9ccd2" }}>Embroidered · Sublimation · Woven — Iron-On, Sew-On & Velcro Backing</span>
          </div>
          <span style={{ fontSize: 24, color: "#a9adb5" }}>Your Design. Our Craft. · Wholesale · OEM & Private Label</span>
        </div>
      </div>
    ),
    size
  );
}
