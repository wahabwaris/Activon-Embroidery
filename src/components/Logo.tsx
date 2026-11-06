import Image from "next/image";
import Link from "next/link";

/** Official Activon Embroidery logo (metallic gold, silver and black; transparent background). */
export const LOGO = { src: "/brand/activon-logo.webp", width: 900, height: 399 };

export function LogoImage({ className = "h-12 w-auto", priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={LOGO.src}
      width={LOGO.width}
      height={LOGO.height}
      alt="Activon Embroidery"
      priority={priority}
      sizes="(max-width: 768px) 160px, 260px"
      className={className}
    />
  );
}

export default function Logo({ className = "h-[52px] w-auto sm:h-14", priority = true }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className="block shrink-0 transition-opacity hover:opacity-90" aria-label="Activon Embroidery – home">
      <LogoImage className={className} priority={priority} />
    </Link>
  );
}
