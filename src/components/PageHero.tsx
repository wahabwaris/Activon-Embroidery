import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { WordsReveal, Reveal } from "./motion";
import type { ReactNode } from "react";

type Crumb = { name: string; path: string };

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-44">
      <JsonLd data={breadcrumbJsonLd(all)} />
      <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[120px]" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-silver-500">
              {all.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  {i < all.length - 1 ? (
                    <Link href={c.path} className="transition hover:text-white">
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-silver-300">
                      {c.name}
                    </span>
                  )}
                  {i < all.length - 1 && <ChevronRight className="h-3 w-3" />}
                </li>
              ))}
            </ol>
          </nav>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <h1 className="h-display mt-5 text-5xl text-white sm:text-6xl lg:text-7xl">
            <WordsReveal text={title} />
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-silver-300">{lead}</p>
          </Reveal>
          {children && <Reveal delay={0.45}><div className="mt-9 flex flex-wrap gap-3">{children}</div></Reveal>}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
