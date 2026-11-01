import { BadgeCheck, Headset, Lock, Receipt, Scale, Zap } from "lucide-react";
import { PROMISES, type PromiseIcon } from "@/lib/content/coxs-bazar";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const ICONS: Record<PromiseIcon, typeof BadgeCheck> = {
  verified: BadgeCheck,
  price: Receipt,
  secure: Lock,
  instant: Zap,
  match: Scale,
  support: Headset,
};

/** Six promises. The Cox's Bazar office lives in the footer card, on every page. */
export default function TrustAndOffice() {
  return (
    <section id="why-tofiza" className="relative bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Why Tofiza"
          title={
            <>
              Booked online, <span className="italic text-secondary-600">backed in person</span>
            </>
          }
          lede="We are a small, local team that would rather list fewer hotels than list ones we cannot stand behind."
        />

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.08}>
          {PROMISES.map((p, i) => {
            const Icon = ICONS[p.icon];
            return (
              <StaggerItem key={p.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-sand-300/70 bg-sand-50 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_60px_-30px_rgba(11,24,120,0.4)]">
                  <span
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
                  />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                    <Icon
                      size={22}
                      className="i-bob"
                      style={{ animationDelay: `${i * 0.35}s` }}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl font-semibold text-brand-900 text-balance">{p.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
