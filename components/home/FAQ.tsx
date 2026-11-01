"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Phone, Plus } from "lucide-react";
import { faqs } from "@/lib/content/coxs-bazar";
import { CONTACT } from "@/lib/config/contact";
import { EASE, Reveal } from "@/components/motion/Reveal";

/** Two columns: the question list scrolls, the heading and a way to reach a person stay put. */
export default function FAQ() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="relative bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-600 mb-3 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-secondary-500/60" />
                Good to know
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold leading-[1.05] text-brand-900 text-balance">
                Questions about <span className="italic text-secondary-600">Cox&apos;s Bazar</span>, answered
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-3xl bg-sand-100 border border-sand-300/60 p-6">
                <p className="flex items-center gap-2 font-semibold text-brand-900">
                  <MessageCircle size={18} className="i-sway text-secondary-500" aria-hidden="true" />
                  Still unsure?
                </p>
                <p className="mt-1.5 text-sm text-slate-600">A person will pick up, at any hour.</p>
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
                >
                  <Phone size={15} className="i-ring" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-sand-300/70 border-y border-sand-300/70">
            {faqs.map((faq, i) => {
              const isOpen = open === faq.id;
              return (
                <Reveal key={faq.id} delay={Math.min(i, 4) * 0.05}>
                  <div>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`${faq.id}-panel`}
                        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span
                          className={`font-display text-lg sm:text-xl font-semibold leading-snug transition-colors ${
                            isOpen ? "text-brand-600" : "text-brand-900 group-hover:text-brand-600"
                          }`}
                        >
                          {faq.question}
                        </span>
                        <motion.span
                          aria-hidden="true"
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: reduced ? 0 : 0.3, ease: EASE }}
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isOpen
                              ? "border-secondary-500 bg-secondary-500 text-white"
                              : "border-sand-300 text-slate-500 group-hover:border-brand-400"
                          }`}
                        >
                          <Plus size={16} />
                        </motion.span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`${faq.id}-panel`}
                          role="region"
                          initial={reduced ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduced ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-12 text-[15px] leading-relaxed text-slate-600">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
