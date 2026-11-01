"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CreditCard, MailCheck, Search, Timer } from "lucide-react";
import { BOOKING_STEPS } from "@/lib/content/coxs-bazar";
import SectionHeading from "./SectionHeading";
import Wave from "./Wave";
import { EASE, Stagger, StaggerItem } from "@/components/motion/Reveal";

const ICONS = { search: Search, hold: Timer, pay: CreditCard, confirmed: MailCheck } as const;

/**
 * The booking flow exactly as it works, drawn as a path that fills in as the
 * band scrolls into view. Replaces the placeholder tutorial videos.
 */
export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="relative bg-brand-900 grain text-white scroll-mt-20">
      <Wave className="text-white rotate-180 -mb-px" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">
        <SectionHeading
          tone="dark"
          eyebrow="How booking works"
          title={
            <>
              From search to <span className="italic text-secondary-300">confirmed</span> in four steps
            </>
          }
          lede="No surprises at the end: you see the full price first, and you are never charged before you reach the payment page."
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div aria-hidden="true" className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-white/15">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-secondary-400 to-secondary-200"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
            />
          </div>

          <Stagger className="grid gap-10 lg:gap-6 lg:grid-cols-4" stagger={0.18}>
            {BOOKING_STEPS.map((step, i) => {
              const Icon = ICONS[step.id];
              return (
                <StaggerItem key={step.id} className="relative flex lg:flex-col gap-5 lg:gap-6 lg:items-center lg:text-center">
                  <div className="relative shrink-0">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 border border-white/20 shadow-lg shadow-black/20">
                      <Icon
                        size={22}
                        className="i-bob text-secondary-300"
                        style={{ animationDelay: `${i * 0.4}s` }}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="absolute -top-2 -right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-500 text-[11px] font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-200 max-w-xs">{step.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
      <Wave className="text-sand-50 -mb-px" />
    </section>
  );
}
