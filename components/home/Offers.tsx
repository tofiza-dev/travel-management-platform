import Image from "next/image";
import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { ArrowRight, Clock } from "lucide-react";
import { getActiveOffers } from "@/lib/services/home-content";
import { cdn } from "@/lib/utils/cdn";
import { tags } from "@/lib/cache/tags";
import { FEATURES } from "@/lib/config/features";
import SectionHeading from "./SectionHeading";
import CopyCode from "./CopyCode";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Curated in the admin under Content. Expired offers are dropped server-side,
 * and flight offers are held back while flights are not on sale — so this
 * never advertises something a guest cannot book. Hidden entirely when empty.
 */
export default async function Offers() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.home());

  const offers = (await getActiveOffers()).filter((o) => FEATURES.flights || o.type !== "flight").slice(0, 3);
  if (offers.length === 0) return null;

  return (
    <section id="offers" className="relative bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Offers"
          title={
            <>
              Savings on your <span className="italic text-secondary-600">stay</span>
            </>
          }
          lede="Use a code at checkout. Each offer shows exactly when it ends."
        />

        <Stagger className="grid gap-5">
          {offers.map((promo) => (
            <StaggerItem key={promo.id}>
              <article className="relative grid sm:grid-cols-12 overflow-hidden rounded-3xl shadow-[0_20px_50px_-26px_rgba(11,24,120,0.4)] border border-sand-300/60 bg-sand-50">
                {/* Ticket notches */}
                <span aria-hidden="true" className="hidden sm:block absolute left-[41.66%] -top-3 -translate-x-1/2 w-6 h-6 rounded-full bg-white z-10" />
                <span aria-hidden="true" className="hidden sm:block absolute left-[41.66%] -bottom-3 -translate-x-1/2 w-6 h-6 rounded-full bg-white z-10" />

                <div className="relative sm:col-span-5 min-h-[200px]">
                  <Image
                    src={cdn(promo.image, 800, 600)}
                    alt={promo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-brand-950/10" />
                  <span className="absolute left-5 bottom-5 rounded-full bg-secondary-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                    {promo.discount}
                  </span>
                </div>

                <div className="sm:col-span-7 p-6 sm:p-8 sm:border-l-2 sm:border-dashed sm:border-sand-300 flex flex-col justify-center gap-4">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-brand-900 text-balance">{promo.title}</h3>
                    {promo.description && (
                      <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">{promo.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {promo.code && <CopyCode code={promo.code} />}
                    <Link
                      href={promo.href}
                      className="group inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700"
                    >
                      Find a stay
                      <ArrowRight size={15} className="i-nudge" aria-hidden="true" />
                    </Link>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={12} className="i-tock" aria-hidden="true" />
                    Ends{" "}
                    {new Date(promo.expiresAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
