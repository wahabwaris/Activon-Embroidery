import { Reveal } from "./motion";

export default function SectionHeading({
  eyebrow,
  title,
  text,
  center,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag className="h-display mt-4 text-4xl text-white md:text-5xl">{title}</Tag>
      </Reveal>
      {text && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-silver-300 md:text-lg">{text}</p>
        </Reveal>
      )}
    </div>
  );
}
