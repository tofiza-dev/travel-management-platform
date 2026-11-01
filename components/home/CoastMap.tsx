"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Navigation } from "lucide-react";
import { EASE } from "@/components/motion/Reveal";

export interface MapPlace {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  fromKolatoli: string;
  /** Position along the coastline, 0 (north) to 100 (south). */
  at: number;
  /** Live stays Tofiza has in this place. Zero means exploring only. */
  stays: number;
}

const COAST_PATH = "M262 -10 C236 70 270 130 232 200 S196 300 210 372 S150 480 126 612";
const VIEW_W = 360;
const VIEW_H = 600;

/**
 * An illustrated stretch of coast with the places that matter on it. Places
 * where we have stays glow orange; the rest are marked as somewhere to explore,
 * so the map never implies inventory we do not have.
 */
export default function CoastMap({ places }: { places: MapPlace[] }) {
  const reduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pins, setPins] = useState<Record<string, { x: number; y: number }>>({});
  const [selectedId, setSelectedId] = useState(places.find((p) => p.stays > 0)?.id ?? places[0]?.id);
  const selected = places.find((p) => p.id === selectedId) ?? places[0];

  // Pins are placed by asking the path itself where "62% of the way down" is,
  // so they sit exactly on the line whatever shape it is given.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const next: Record<string, { x: number; y: number }> = {};
    for (const p of places) {
      const pt = path.getPointAtLength((total * (p.at + 4)) / 108);
      next[p.id] = { x: pt.x, y: pt.y };
    }
    setPins(next);
  }, [places]);

  if (!selected) return null;

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
      {/* Illustration */}
      <div className="lg:col-span-5">
        <div className="relative h-full min-h-[460px] rounded-[2rem] overflow-hidden border border-sea-300/40 bg-gradient-to-b from-sea-400/25 via-sea-300/20 to-sea-500/30 shadow-[0_30px_70px_-30px_rgba(24,123,136,0.55)]">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label={`Illustrated map of the Cox's Bazar coast, from Kolatoli in the north to Teknaf in the south`}
          >
            <defs>
              <linearGradient id="sea" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1e98a6" stopOpacity="0.5" />
                <stop offset="1" stopColor="#7fd1d6" stopOpacity="0.15" />
              </linearGradient>
              <clipPath id="land">
                <path d={`${COAST_PATH} L${VIEW_W + 20} 612 L${VIEW_W + 20} -10 Z`} />
              </clipPath>
            </defs>

            <rect width={VIEW_W} height={VIEW_H} fill="url(#sea)" />

            {/* Surf lines, drifting toward the shore */}
            {[22, 44, 66].map((offset, i) => (
              <path
                key={offset}
                d={COAST_PATH}
                transform={`translate(${-offset} 0)`}
                fill="none"
                stroke="white"
                strokeOpacity={0.5 - i * 0.12}
                strokeWidth={1.5}
                strokeDasharray="2 10"
                strokeLinecap="round"
              >
                {!reduced && (
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`${-offset} 0; ${-offset + 8} 0; ${-offset} 0`}
                    dur={`${5 + i * 1.5}s`}
                    repeatCount="indefinite"
                  />
                )}
              </path>
            ))}

            {/* Land */}
            <path d={`${COAST_PATH} L${VIEW_W + 20} 612 L${VIEW_W + 20} -10 Z`} fill="#f6efe4" />
            <g clipPath="url(#land)" opacity="0.55">
              {[70, 150, 230, 310, 390, 470, 550].map((y) => (
                <path
                  key={y}
                  d={`M0 ${y} C 90 ${y - 18}, 200 ${y + 18}, 380 ${y - 6}`}
                  fill="none"
                  stroke="#dcc8a6"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Shoreline, drawn on as the map scrolls into view */}
            <motion.path
              ref={pathRef}
              d={COAST_PATH}
              fill="none"
              stroke="#ffffff"
              strokeWidth={5}
              strokeLinecap="round"
              initial={reduced ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 2.2, ease: EASE }}
            />
            <path d={COAST_PATH} fill="none" stroke="#dcc8a6" strokeWidth={1} opacity={0.9} />
          </svg>

          {/* Pins — HTML over the SVG, so they can be real buttons */}
          {places.map((p) => {
            const pos = pins[p.id];
            if (!pos) return null;
            const active = p.id === selected.id;
            const live = p.stays > 0;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedId(p.id)}
                onMouseEnter={() => setSelectedId(p.id)}
                aria-pressed={active}
                aria-label={`${p.name}${live ? `, ${p.stays} ${p.stays === 1 ? "stay" : "stays"}` : ""}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${(pos.x / VIEW_W) * 100}%`, top: `${(pos.y / VIEW_H) * 100}%` }}
              >
                {live && !reduced && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-secondary-500/50 animate-ping-ring"
                  />
                )}
                <span
                  className={`relative flex items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                    live ? "bg-secondary-500" : "bg-brand-600"
                  } ${active ? "w-9 h-9 scale-110" : "w-6 h-6 group-hover:scale-110"}`}
                >
                  <MapPin size={active ? 16 : 11} className={`text-white ${active ? "i-pin" : ""}`} aria-hidden="true" />
                </span>
                <span
                  className={`absolute left-full ml-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-md transition-all duration-300 ${
                    active ? "bg-white text-brand-800 opacity-100" : "bg-white/80 text-slate-600 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {p.name}
                </span>
              </button>
            );
          })}

          <div className="absolute left-4 bottom-4 flex items-center gap-3 rounded-full bg-white/85 backdrop-blur px-3.5 py-2 text-[11px] font-medium text-slate-600 shadow">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-500" /> Our stays
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-600" /> To explore
            </span>
          </div>
          <span className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[0.25em] text-sea-600/80">
            Bay of Bengal
          </span>
        </div>
      </div>

      {/* Place list + detail */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="rounded-[2rem] bg-white border border-sand-300/60 p-6 sm:p-8 shadow-[0_24px_60px_-30px_rgba(11,24,120,0.35)] min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded-full bg-sea-300/30 text-sea-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1">
                  {selected.kind}
                </span>
                {selected.stays > 0 && (
                  <span className="rounded-full bg-secondary-100 text-secondary-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1">
                    {selected.stays} {selected.stays === 1 ? "stay" : "stays"} with Tofiza
                  </span>
                )}
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-brand-900">{selected.name}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-600 max-w-xl">{selected.blurb}</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Navigation size={14} className="i-sway text-secondary-500" aria-hidden="true" />
                {selected.fromKolatoli}
              </p>
              <div className="mt-6">
                {selected.stays > 0 ? (
                  <Link
                    href={`/hotels/search?destination=${encodeURIComponent(selected.name)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary-500 hover:bg-secondary-600 text-white text-sm font-bold px-6 py-3 shadow-lg shadow-secondary-500/30 transition-colors"
                  >
                    See stays in {selected.name} <ArrowRight size={15} className="i-nudge" />
                  </Link>
                ) : (
                  <p className="text-sm text-slate-500">
                    No Tofiza stays here yet.{" "}
                    <Link
                      href="/hotels/search?destination=Kolatoli"
                      className="font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4"
                    >
                      Stay in Kolatoli and visit
                    </Link>
                    .
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3" aria-label="Places along the coast">
          {places.map((p) => {
            const active = p.id === selected.id;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  aria-pressed={active}
                  className={`w-full text-left rounded-2xl border px-4 py-3 transition-all duration-300 ${
                    active
                      ? "border-brand-600 bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                      : "border-sand-300/70 bg-white hover:border-brand-300 text-slate-700"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm">{p.name}</span>
                    {p.stays > 0 && (
                      <span
                        className={`w-2 h-2 rounded-full ${active ? "bg-secondary-300" : "bg-secondary-500"}`}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className={`block text-xs mt-0.5 ${active ? "text-brand-200" : "text-slate-400"}`}>{p.kind}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
