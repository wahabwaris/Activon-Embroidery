import type { ProductKey, ShapeKey } from "@/lib/catalog";

type Props = {
  type: ProductKey;
  shape?: ShapeKey;
  palette?: [string, string, string]; // primary, dark/base, light
  title?: string;
  subtitle?: string;
  className?: string;
  ariaLabel?: string;
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

function scallop(points = 14, outer = 90, inner = 78) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(`${(100 + r * Math.cos(a)).toFixed(1)},${(100 + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function ShapeEl({ shape, ...rest }: { shape: ShapeKey } & React.SVGProps<SVGElement>) {
  const p = rest as Record<string, unknown>;
  switch (shape) {
    case "circle":
      return <circle cx={100} cy={100} r={86} {...p} />;
    case "shield":
      return <path d="M100 14 L176 40 V98 C176 146 142 174 100 188 C58 174 24 146 24 98 V40 Z" {...p} />;
    case "rectangle":
      return <rect x={14} y={44} width={172} height={112} {...p} />;
    case "rounded":
      return <rect x={16} y={34} width={168} height={132} rx={30} {...p} />;
    case "hexagon":
      return <polygon points="100,12 176,56 176,144 100,188 24,144 24,56" {...p} />;
    case "custom":
    default:
      return <polygon points={scallop()} {...p} />;
  }
}

/**
 * Vector patch illustration used as placeholder artwork until real product
 * photography is added. Each patch type gets a distinct visual texture.
 */
export default function PatchArt({
  type,
  shape = "circle",
  palette = ["#d4af72", "#101010", "#f5f5f3"],
  title = "ACTIVON",
  subtitle = "EMBROIDERY",
  className,
  ariaLabel,
}: Props) {
  const [primary, base, light] = palette;
  const id = "p" + hash(`${type}${shape}${palette.join("")}${title}${subtitle}`);
  const isEmb = type === "embroidered";
  const isSub = type === "sublimation";
  const isWov = type === "woven";
  const wide = shape === "rectangle" || shape === "rounded";

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={ariaLabel || `Custom ${type} patch, ${shape} shape`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <ShapeEl shape={shape} />
        </clipPath>
        {/* satin stitch texture */}
        <pattern id={`${id}-stitch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="5" height="5" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="5" stroke="#fff" strokeWidth="1.4" strokeOpacity="0.16" />
        </pattern>
        {/* woven texture */}
        <pattern id={`${id}-weave`} width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="1.5" fill="#fff" fillOpacity="0.07" />
          <rect x="0" y="1.5" width="1.5" height="1.5" fill="#000" fillOpacity="0.12" />
        </pattern>
        <linearGradient id={`${id}-sub`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="45%" stopColor={primary} />
          <stop offset="100%" stopColor={base} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.3" cy="0.25" r="0.8">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        {/* base */}
        <ShapeEl shape={shape} fill={isSub ? `url(#${id}-sub)` : base} />

        <g clipPath={`url(#${id}-clip)`}>
          {isEmb && (
            <>
              <circle cx="100" cy="100" r="58" fill={primary} />
              <circle cx="100" cy="100" r="58" fill={`url(#${id}-stitch)`} />
              <path d="M100 62 L112 92 L144 94 L119 113 L128 144 L100 126 L72 144 L81 113 L56 94 L88 92 Z" fill={light} />
              <path d="M100 62 L112 92 L144 94 L119 113 L128 144 L100 126 L72 144 L81 113 L56 94 L88 92 Z" fill={`url(#${id}-stitch)`} />
              <rect x="0" y="0" width="200" height="200" fill={`url(#${id}-stitch)`} />
            </>
          )}
          {isSub && (
            <>
              <circle cx="132" cy="70" r="22" fill={light} fillOpacity="0.9" />
              <path d="M0 140 Q40 96 80 126 T160 112 T220 120 V220 H0 Z" fill={base} fillOpacity="0.75" />
              <path d="M0 160 Q50 124 100 150 T200 140 V220 H0 Z" fill={base} />
              <rect x="0" y="0" width="200" height="200" fill={`url(#${id}-glow)`} />
            </>
          )}
          {isWov && (
            <>
              <rect x="0" y="0" width="200" height="200" fill={`url(#${id}-weave)`} />
              <g stroke={light} strokeWidth="1.2" fill="none" opacity="0.9">
                <circle cx="100" cy={wide ? 86 : 82} r="26" />
                <circle cx="100" cy={wide ? 86 : 82} r="20" />
              </g>
              <path
                d={`M88 ${wide ? 96 : 92} L100 ${wide ? 70 : 66} L112 ${wide ? 96 : 92} M93 ${wide ? 86 : 82} H107`}
                stroke={primary}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </g>

        {/* text */}
        <text
          x="100"
          y={isEmb ? (wide ? 168 : 172) : isWov ? (wide ? 134 : 132) : 106}
          textAnchor="middle"
          fontFamily="Oswald, Impact, sans-serif"
          fontWeight={700}
          fontSize={isWov ? 18 : 16}
          letterSpacing={isWov ? 3 : 2}
          fill={light}
          stroke={isEmb ? base : "none"}
          strokeWidth={isEmb ? 0.6 : 0}
          style={{ paintOrder: "stroke" }}
          opacity={isEmb && (shape === "rectangle" || shape === "rounded") ? 0 : 1}
        >
          {title}
        </text>
        {isWov && (
          <text x="100" y={wide ? 148 : 147} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="3" fill={light} opacity="0.8">
            {subtitle}
          </text>
        )}
        {isSub && (
          <text x="100" y="122" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="3" fill={light} opacity="0.9">
            {subtitle}
          </text>
        )}

        {/* border */}
        {isWov ? (
          <ShapeEl shape={shape} fill="none" stroke={light} strokeOpacity="0.85" strokeWidth={3} />
        ) : (
          <>
            <ShapeEl shape={shape} fill="none" stroke={isSub ? base : primary} strokeWidth={9} />
            <ShapeEl shape={shape} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth={9} strokeDasharray="1.2 2.2" />
          </>
        )}
      </g>
    </svg>
  );
}
