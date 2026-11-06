import { Reveal } from "./motion";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  as: Tag = "h2",
  light,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  as?: "h2" | "h3";
  /** Render for a light (paper) background. */
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${center ? "justify-center" : ""} ${light ? "!text-brand-600" : ""}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag className={`h-display mt-4 text-4xl md:text-5xl ${light ? "text-ink" : "text-white"}`}>{title}</Tag>
      </Reveal>
      {text && (
        <Reveal delay={0.1}>
          <p className={`mt-5 text-base leading-relaxed md:text-lg ${light ? "text-silver-700" : "text-silver-300"}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
