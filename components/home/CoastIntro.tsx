import Image from "next/image";
import { cdn } from "@/lib/utils/cdn";
import { Reveal } from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

/**
 * The four coast photographs, in the order the mosaic lays them out: the two
 * portrait frames take the arched tiles (first and last), the two landscape
 * ones take the rectangles between. Files live in public/cox-photos; swap a
 * file there, keeping its orientation, and the page follows.
 */
const PHOTOS = [
  { src: "/cox-photos/1.jpg", alt: "Waves rolling onto a long, wide beach" },
  { src: "/cox-photos/2.jpg", alt: "A wooden boat resting among palm trees on the sand" },
  { src: "/cox-photos/3.jpg", alt: "Wooden boats silhouetted against a setting sun" },
  { src: "/cox-photos/4.jpg", alt: "The sun setting over the sea beyond the shoreline" },
];

/**
 * The launch story, told plainly: one coast, starting here.
 */
export default function CoastIntro() {
  const photos = PHOTOS;

  return (
    <section className="relative bg-sand-50 overflow-hidden">
      {/* On a phone the order is label, photographs, then the story; from lg up
          the label and story share the left column. `contents` lets the three
          pieces be reordered as siblings on mobile without affecting desktop. */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28 grid lg:grid-cols-12 gap-x-8 gap-y-8 lg:gap-y-0 items-center">
        <div className="contents lg:block lg:col-span-6">
          <Reveal className="order-1 lg:order-none lg:mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-600 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-secondary-500/60" />
              Why only Cox&apos;s Bazar
            </p>
          </Reveal>
          <div className="order-3 lg:order-none">
            <Reveal>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] text-brand-900 text-balance">
                A hundred and twenty kilometres of sand.{" "}
                <span className="italic text-secondary-600">Start with the right stay.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
                Cox&apos;s Bazar is one of the longest unbroken sea beaches in the world, and it is
                where we are starting — and the only place we are starting. That is deliberate: every
                property we list is one our team has checked, and every booking has real people in
                Kolatoli behind it.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-500 max-w-xl">
                More coast, more cities, and flights will follow. Until they do, we would rather do
                one place properly than many places halfway.
              </p>
            </Reveal>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="order-2 lg:order-none lg:col-span-6 relative">
            <div
              aria-hidden="true"
              className="absolute -z-0 -right-8 -bottom-8 w-48 h-48 rounded-full bg-secondary-100/80 blur-3xl animate-float"
            />
            {/* Two staggered columns that together fill the whole block: arch
                and rectangle on the left, rectangle and inverted arch on the
                right, the right column dropped a little for rhythm. */}
            <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
              <Parallax speed={10}>
                <div className="flex flex-col gap-4 sm:gap-5 pb-8 sm:pb-12">
                  {photos[0] && <Tile photo={photos[0]} shape="rounded-t-[999px] rounded-b-3xl" ratio="aspect-[4/5]" />}
                  {photos[1] && <Tile photo={photos[1]} shape="rounded-3xl" ratio="aspect-[4/3]" />}
                </div>
              </Parallax>
              <Parallax speed={-10}>
                <div className="flex flex-col gap-4 sm:gap-5 pt-8 sm:pt-12">
                  {photos[2] && <Tile photo={photos[2]} shape="rounded-3xl" ratio="aspect-[4/3]" />}
                  {photos[3] && <Tile photo={photos[3]} shape="rounded-t-3xl rounded-b-[999px]" ratio="aspect-[4/5]" />}
                </div>
              </Parallax>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Tile({
  photo,
  shape,
  ratio,
}: {
  photo: { src: string; alt: string };
  shape: string;
  ratio: string;
}) {
  return (
    <div className={`group relative w-full overflow-hidden shadow-xl shadow-brand-900/15 ${ratio} ${shape}`}>
      <Image
        src={cdn(photo.src, 640, 800)}
        alt={photo.alt}
        fill
        sizes="(max-width: 1024px) 45vw, 300px"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
      />
    </div>
  );
}
