import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { CONTACT } from "@/lib/config/contact";
import { LAUNCH } from "@/lib/config/launch";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${CONTACT.localOffice.name}, ${CONTACT.localOffice.oneLine}`,
)}`;

/**
 * The card above the footer: the property-owner invitation on the left, the
 * Cox's Bazar office on the right. It sits on every public page, so the one
 * thing a booking site rarely has — a door to knock on — is always in reach.
 */
export default function PartnerOfficeCard() {
  return (
    <div className="grain relative overflow-hidden rounded-[2rem] bg-brand-800 text-white">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary-500/25 blur-3xl animate-float"
      />
      <div className="relative grid lg:grid-cols-12 gap-8 p-8 sm:p-12 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary-300">For property owners</p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-balance">
            Own a property? List it here
          </h3>
          <p className="mt-4 max-w-xl text-brand-200 leading-relaxed">
            Reach travellers looking for a stay in {LAUNCH.city} — listing takes minutes and there is
            no upfront cost.
          </p>
          <Link
            href="/auth/register/partner"
            className="sheen relative mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg shadow-black/20 transition-colors hover:bg-sand-100"
          >
            List Your Property
            <ArrowRight size={16} className="i-nudge" aria-hidden="true" />
          </Link>
        </div>

        <div className="lg:col-span-5">
          <div className="gradient-border rounded-3xl bg-white/10 backdrop-blur p-6 sm:p-7">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="i-pin mt-0.5 shrink-0 text-secondary-300" aria-hidden="true" />
              <span className="text-sm leading-relaxed">
                <span className="block font-semibold">{CONTACT.localOffice.name}</span>
                {CONTACT.localOffice.lines.map((l) => (
                  <span key={l} className="block text-brand-100">
                    {l}
                  </span>
                ))}
              </span>
            </p>
            <a
              href={`tel:${CONTACT.phoneE164}`}
              className="mt-4 flex items-center gap-3 text-sm font-semibold hover:text-secondary-200 transition-colors"
            >
              <Phone size={18} className="i-ring shrink-0 text-secondary-300" aria-hidden="true" />
              {CONTACT.phone}
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-secondary-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-secondary-600"
            >
              Get directions
              <ArrowUpRight size={15} className="i-nudge-ne" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
