import Image from "next/image";
import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { getPopularHotels, type HotelCardData } from "@/lib/services/public-hotels";
import { cdn } from "@/lib/utils/cdn";
import { formatCurrency } from "@/lib/utils/formatters";
import { tags } from "@/lib/cache/tags";
import { LAUNCH } from "@/lib/config/launch";
import SectionHeading from "./SectionHeading";
import TiltCard from "@/components/motion/TiltCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Cached UI, not just cached data: the whole rail is part of the static shell,
 * so the homepage paints it without waiting on the database.
 *
 * Every card is photo above, details below — nothing is written over the
 * photograph except two small badges. The first stay gets a wide, side-by-side
 * card; the rest sit beneath it in a row, whatever their number.
 */
export default async function FeaturedStays() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.home(), tags.hotels());

  const hotels = await getPopularHotels(6);
  if (hotels.length === 0) return null;

  const [lead, ...rest] = hotels;
  const restSpan = rest.length === 1 ? "lg:col-span-12" : rest.length === 2 ? "lg:col-span-6" : "lg:col-span-4";

  return (
    <section id="stays" className="relative bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Stay with us"
          title={
            <>
              Where to stay in <span className="italic text-secondary-600">{LAUNCH.city}</span>
            </>
          }
          lede="Every property is checked by our team before it is listed. Rates are live for your dates."
          action={
            <Link
              href="/hotels/search"
              className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              See all stays
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          }
        />

        <Stagger className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8" stagger={0.14}>
          <StaggerItem className="lg:col-span-12">
            <StayCard hotel={lead} feature />
          </StaggerItem>
          {rest.map((hotel) => (
            <StaggerItem key={hotel.id} className={restSpan}>
              <StayCard hotel={hotel} />
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/hotels/search" className="inline-flex items-center gap-1.5 text-brand-600 font-semibold text-sm">
            See all stays <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StayCard({ hotel, feature = false }: { hotel: HotelCardData; feature?: boolean }) {
  const chips = [...hotel.tags, ...hotel.amenities].filter((v, i, all) => all.indexOf(v) === i).slice(0, feature ? 5 : 3);
  const image = hotel.image ?? hotel.images[0];

  return (
    <TiltCard max={2.5} className="group/tilt relative h-full rounded-[1.75rem]">
      <Link
        href={`/hotels/${citySlug(hotel.city)}/${hotel.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sand-300/70 bg-white shadow-[0_24px_60px_-32px_rgba(11,24,120,0.45)] transition-shadow duration-500 hover:shadow-[0_32px_70px_-30px_rgba(11,24,120,0.55)] ${
          feature ? "lg:flex-row" : ""
        }`}
      >
        {/* Photograph — clean, with only badges in the corners */}
        <div
          className={`relative overflow-hidden bg-sand-100 ${
            feature ? "aspect-[4/3] lg:aspect-auto lg:w-[58%] lg:min-h-[440px]" : "aspect-[16/10]"
          }`}
        >
          {image && (
            <Image
              src={cdn(image, feature ? 1200 : 800, feature ? 900 : 600)}
              alt={hotel.name}
              fill
              sizes={feature ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 33vw"}
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
            />
          )}

          <span
            className="absolute left-4 top-4 flex items-center gap-0.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md"
            aria-label={`${hotel.starCategory}-star property`}
          >
            {Array.from({ length: hotel.starCategory }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className="i-twinkle fill-amber-400 text-amber-400"
                style={{ animationDelay: `${i * 0.25}s` }}
                aria-hidden="true"
              />
            ))}
          </span>

          {hotel.displayReviewCount > 0 && (
            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-brand-900 px-3 py-1.5 text-xs font-bold text-white tabular-nums shadow-md">
              <Star size={12} className="fill-amber-300 text-amber-300" aria-hidden="true" />
              {hotel.displayRating.toFixed(1)}
              <span className="font-medium text-brand-200">({hotel.displayReviewCount})</span>
            </span>
          )}
        </div>

        {/* Details — their own panel below (beside, on the wide card) */}
        <div className={`flex flex-1 flex-col p-6 sm:p-7 ${feature ? "lg:w-[42%] lg:p-10" : ""}`}>
          <h3
            className={`font-display font-semibold leading-tight text-brand-900 text-balance transition-colors group-hover:text-brand-600 ${
              feature ? "text-3xl lg:text-4xl" : "text-2xl"
            }`}
          >
            {hotel.name}
          </h3>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
            <MapPin size={14} aria-hidden="true" className="ih-pop mt-0.5 shrink-0 text-secondary-500" />
            <span>{hotel.location}</span>
          </p>

          {feature && (
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600 line-clamp-3">{hotel.description}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-sand-300 bg-sand-50 px-2.5 py-1 text-[11px] font-medium text-slate-600"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-end justify-between gap-4 border-t border-sand-200 pt-5">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-slate-400">From</p>
                <p className="text-2xl font-bold text-brand-900 tabular-nums">
                  {formatCurrency(hotel.priceFrom, hotel.currency)}
                  <span className="ml-1 text-xs font-medium text-slate-400">/ night</span>
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-secondary-500">
                View stay
                <ArrowUpRight size={15} aria-hidden="true" className="i-nudge-ne" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

function citySlug(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
