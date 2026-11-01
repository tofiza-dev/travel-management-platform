import { cacheLife, cacheTag } from "next/cache";
import { BedDouble, Banknote, Timer, Headset } from "lucide-react";
import { getLaunchSnapshot } from "@/lib/services/public-hotels";
import { LAUNCH } from "@/lib/config/launch";
import { tags } from "@/lib/cache/tags";
import CountUp from "@/components/motion/CountUp";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * The first thing under the hero: four facts, two of them read live from the
 * database. If nothing is on sale the strip disappears rather than claim
 * something it cannot back up.
 */
export default async function ProofStrip() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.home(), tags.hotels());

  const snap = await getLaunchSnapshot(LAUNCH.city);
  if (snap.stays === 0) return null;

  const symbol = snap.currency === "BDT" ? "৳" : `${snap.currency} `;

  return (
    <section className="relative bg-sand-100 -mt-px">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden bg-sand-300/60 border border-sand-300/60 shadow-[0_20px_50px_-24px_rgba(11,24,120,0.35)]">
          <StaggerItem className="bg-white p-6 lg:p-8">
            <BedDouble size={20} className="i-bob text-secondary-500 mb-4" aria-hidden="true" />
            <p className="font-display text-4xl lg:text-5xl font-semibold text-brand-900">
              <CountUp to={snap.stays} />
            </p>
            <p className="mt-1.5 text-sm text-slate-600">
              verified {snap.stays === 1 ? "stay" : "stays"} in {LAUNCH.city}
            </p>
          </StaggerItem>

          {snap.from !== null && (
            <StaggerItem className="bg-white p-6 lg:p-8">
              <Banknote size={20} className="i-sway [--d:0.4s] text-secondary-500 mb-4" aria-hidden="true" />
              <p className="font-display text-4xl lg:text-5xl font-semibold text-brand-900">
                <CountUp to={snap.from} prefix={symbol} />
              </p>
              <p className="mt-1.5 text-sm text-slate-600">lowest nightly rate on sale now</p>
            </StaggerItem>
          )}

          <StaggerItem className="bg-white p-6 lg:p-8">
            <Timer size={20} className="i-tock text-secondary-500 mb-4" aria-hidden="true" />
            <p className="font-display text-4xl lg:text-5xl font-semibold text-brand-900">
              <CountUp to={15} suffix=" min" />
            </p>
            <p className="mt-1.5 text-sm text-slate-600">your room is held while you pay</p>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 lg:p-8">
            <Headset size={20} className="i-pulse [--d:0.2s] text-secondary-500 mb-4" aria-hidden="true" />
            <p className="font-display text-4xl lg:text-5xl font-semibold text-brand-900">24/7</p>
            <p className="mt-1.5 text-sm text-slate-600">phone support, and an office in Kolatoli</p>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
