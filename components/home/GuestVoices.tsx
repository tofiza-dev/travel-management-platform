import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { Quote, Star } from "lucide-react";
import { getHomeReviews } from "@/lib/services/public-hotels";
import { LAUNCH } from "@/lib/config/launch";
import { tags } from "@/lib/cache/tags";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Below this many published reviews the section stays out of sight — a thin wall of quotes reads as padding. */
const MIN_REVIEWS = 6;

/**
 * Real published reviews from guests who stayed, nothing written for the page.
 * Until enough exist this renders nothing, and appears on its own once they do.
 */
export default async function GuestVoices() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.home(), tags.hotels());

  const reviews = await getHomeReviews(LAUNCH.city, 9);
  if (reviews.length < MIN_REVIEWS) return null;

  return (
    <section id="reviews" className="relative bg-sand-100 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Guest voices"
          title={
            <>
              From people who <span className="italic text-secondary-600">actually stayed</span>
            </>
          }
          lede="Reviews can only be written after a completed stay booked through Tofiza."
        />

        <Stagger className="columns-1 md:columns-2 lg:columns-3 gap-5 [&>*]:mb-5" stagger={0.08}>
          {reviews.map((r) => (
            <StaggerItem key={r.id} className="break-inside-avoid">
              <figure className="relative rounded-3xl bg-white border border-sand-300/60 p-6 shadow-[0_18px_44px_-30px_rgba(11,24,120,0.45)]">
                <Quote size={26} className="i-bob text-secondary-200 mb-3" aria-hidden="true" />
                <div className="flex gap-0.5 mb-3" role="img" aria-label={`${r.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < r.rating ? "i-twinkle fill-amber-400 text-amber-400" : "text-slate-200"}
                      style={{ animationDelay: `${i * 0.25}s` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {r.title && <p className="font-display text-lg font-semibold text-brand-900">{r.title}</p>}
                <blockquote className="mt-2 text-sm leading-relaxed text-slate-600">{r.body}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-sand-200 pt-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {r.authorName.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 text-sm">
                    <span className="block font-semibold text-slate-900 truncate">{r.authorName}</span>
                    <Link href={r.hotelHref} className="block text-xs text-slate-500 hover:text-brand-600 truncate">
                      Stayed at {r.hotelName}
                    </Link>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
