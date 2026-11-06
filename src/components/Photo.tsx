import Image from "next/image";
import type { Photo as PhotoT } from "@/lib/media";

/** Responsive, cropped photo with a subtle hover zoom. The parent controls the aspect ratio. */
export default function Photo({
  photo,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  position = "center",
  caption,
}: {
  photo: PhotoT;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  caption?: string;
}) {
  return (
    <figure className={`group relative overflow-hidden bg-ink-700 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        style={{ objectPosition: position }}
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-4 pt-12 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
