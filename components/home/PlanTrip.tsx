"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bus, Plane, TrainFront } from "lucide-react";
import { GETTING_THERE, MONTHS, SEASON_TIERS, type SeasonTier } from "@/lib/content/coxs-bazar";
import SectionHeading from "./SectionHeading";
import { EASE, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const TIER_STYLE: Record<SeasonTier, { chip: string; dot: string }> = {
  peak: { chip: "bg-secondary-500 text-white", dot: "bg-secondary-500" },
  warm: { chip: "bg-amber-200 text-amber-900", dot: "bg-amber-300" },
  monsoon: { chip: "bg-sea-600 text-white", dot: "bg-sea-600" },
  opening: { chip: "bg-sea-300 text-sea-600", dot: "bg-sea-300" },
};

const MODE_ICON = { air: Plane, road: Bus, rail: TrainFront } as const;

/**
 * When to go and how to get there. A month strip you can poke at, opening on
 * the current month, plus the three ways in from Dhaka.
 */
export default function PlanTrip() {
  const reduced = useReducedMotion();
  // The real month is only known in the browser. useSyncExternalStore hands the
  // server (and first hydration pass) November, then the true month, without a
  // mismatch against the cached HTML.
  const thisMonth = useSyncExternalStore(
    () => () => {},
    () => new Date().getMonth(),
    () => 10,
  );
  const [picked, setPicked] = useState<number | null>(null);
  const month = picked ?? thisMonth;

  const current = MONTHS[month];
  const tier = SEASON_TIERS[current.tier];

  return (
    <section id="plan" className="relative bg-sand-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Plan your trip"
          title={
            <>
              When to go, and <span className="italic text-secondary-600">how to get there</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Season */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-[2rem] bg-white border border-sand-300/60 p-6 sm:p-8 shadow-[0_24px_60px_-34px_rgba(11,24,120,0.35)] h-full">
              <h3 className="font-display text-2xl font-semibold text-brand-900">The Cox&apos;s Bazar year</h3>

              <div className="mt-6 grid grid-cols-6 sm:grid-cols-12 gap-1.5" role="group" aria-label="Month">
                {MONTHS.map((m, i) => {
                  const active = i === month;
                  return (
                    <button
                      key={m.short}
                      type="button"
                      onClick={() => setPicked(i)}
                      aria-pressed={active}
                      className={`relative rounded-xl px-1 py-3 text-xs font-bold transition-all duration-300 ${
                        active
                          ? `${TIER_STYLE[m.tier].chip} shadow-lg scale-[1.06]`
                          : "bg-sand-100 text-slate-500 hover:bg-sand-200"
                      }`}
                    >
                      {m.short}
                      {!active && (
                        <span
                          aria-hidden="true"
                          className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full ${TIER_STYLE[m.tier].dot}`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 min-h-[120px]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.short}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p className="flex items-center gap-2.5">
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${TIER_STYLE[current.tier].chip}`}>
                        {tier.label}
                      </span>
                      <span className="font-display text-xl font-semibold text-brand-900">{current.long}</span>
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-slate-600 max-w-lg">{tier.note}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Seasons are general guidance, not a forecast. Cyclones and heavy weather can occur outside the
                monsoon, so check the forecast before you travel.
              </p>
            </div>
          </Reveal>

          {/* Getting there */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <h3 className="font-display text-2xl font-semibold text-brand-900">Getting there from Dhaka</h3>
            </Reveal>
            <Stagger className="mt-5 flex flex-col gap-3 flex-1">
              {GETTING_THERE.map((g) => {
                const Icon = MODE_ICON[g.id];
                return (
                  <StaggerItem key={g.id}>
                    <div className="group flex items-start gap-4 rounded-2xl bg-white border border-sand-300/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-200">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                        <Icon
                          size={20}
                          className={g.id === "air" ? "i-bob ih-fly" : "i-bob ih-drive"}
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <p className="flex flex-wrap items-baseline gap-x-2">
                          <span className="font-bold text-slate-900">{g.mode}</span>
                          <span className="text-sm font-semibold text-secondary-600">{g.time}</span>
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{g.detail}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <p className="mt-4 text-xs text-slate-400">
              Times are typical, not guaranteed. Tofiza books your stay only — flights are not on sale yet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
