import Link from "next/link";
import PatchArt from "@/components/PatchArt";

export default function NotFound() {
  return (
    <section className="container grid min-h-[80vh] place-items-center pt-28 text-center">
      <div>
        <PatchArt type="embroidered" shape="circle" title="404" className="mx-auto w-48" ariaLabel="404 patch" />
        <h1 className="h-display mt-8 text-5xl text-white">Page not found</h1>
        <p className="mt-4 text-silver-300">This page has come unstitched. Let&apos;s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/products/" className="btn-ghost">View Products</Link>
        </div>
      </div>
    </section>
  );
}
