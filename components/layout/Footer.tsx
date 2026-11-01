import { cacheLife } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "@/lib/config/contact";
import Wave from "@/components/home/Wave";
import PartnerOfficeCard from "./PartnerOfficeCard";

/**
 * Every href here must resolve to a real route. Careers, Press and Blog used to
 * sit in this list with no pages behind them, so all three 404'd — and because
 * Next.js prefetches footer links, they 404'd on every page load. Add a link
 * here only once its page exists.
 */
const footerLinks = {
  company: [
    { label: "List your property", href: "/auth/register/partner" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  support: [
    { label: "Help Centre", href: "/help" },
    { label: "Manage Booking", href: "/account/bookings" },
    { label: "Refunds", href: "/refunds" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Rate Rules", href: "/fare-rules" },
  ],
};

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16.6 5.82c-.9-.78-1.43-1.9-1.43-3.12h-3.09v12.4c0 1.43-1.16 2.6-2.6 2.6a2.6 2.6 0 0 1-2.6-2.6c0-1.71 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64a5.7 5.7 0 0 0 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.32 7.32 0 0 0 4.3 1.38V7.3c-1.06 0-2.32-.44-3.24-1.48Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
    </svg>
  );
}

// Only platforms with a real URL in SOCIAL_LINKS are rendered — see
// lib/config/contact.ts. These used to ship as href="#".
const socialLinks = (
  [
    { name: "Facebook", Icon: FacebookIcon, bg: "bg-[#1877F2] hover:bg-[#1877F2]" },
    { name: "Instagram", Icon: InstagramIcon, bg: "bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888]" },
    { name: "TikTok", Icon: TikTokIcon, bg: "bg-black hover:bg-black" },
    { name: "YouTube", Icon: YoutubeIcon, bg: "bg-[#FF0000] hover:bg-[#FF0000]" },
  ] as const
)
  .map((s) => ({ ...s, href: SOCIAL_LINKS[s.name] }))
  .filter((s): s is typeof s & { href: string } => Boolean(s.href));

export default async function Footer() {
  "use cache";
  // Revalidates daily, so the year rolls over without a redeploy.
  cacheLife("days");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-brand-100">
      {/* Property-owner invitation and the Cox's Bazar office, as one floating
          card rather than a full-bleed strip. */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 sm:pt-14 sm:pb-8">
          <PartnerOfficeCard />
        </div>
      </div>

      {/* Everything below the wave sits on the navy band; the wave is the same
          drifting one the homepage uses, so the page ends the way it began. */}
      <div className="relative bg-brand-900 grain">
      <Wave className="text-white rotate-180 -mb-px" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10 sm:gap-10">
          {/* Brand col */}
          <div className="col-span-2 space-y-5">
            <Image
              src="/asset/tofiza.png"
              alt="Tofiza Tours & Travels"
              width={306}
              height={90}
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <p className="text-brand-200 text-sm leading-relaxed max-w-xs">
              Tofiza books verified beachside stays in Cox&apos;s Bazar — live rates,
              a room held while you pay, and a team in Kolatoli if anything needs
              sorting. More destinations and flights will follow; for now we do
              one place properly.
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Phone size={14} className="i-ring text-secondary-300 shrink-0" />
                {CONTACT.phone} (24/7)
              </a>
              <a
                href={`mailto:${CONTACT.supportEmail}`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="i-bob text-secondary-300 shrink-0" />
                {CONTACT.supportEmail}
                <span className="text-brand-300 text-xs">· support</span>
              </a>
              <a
                href={`mailto:${CONTACT.bookingEmail}?subject=Booking%20enquiry`}
                className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="i-bob [--d:0.5s] text-secondary-300 shrink-0" />
                {CONTACT.bookingEmail}
                <span className="text-brand-300 text-xs">· bookings</span>
              </a>
              <span className="flex items-start gap-2 text-sm">
                <MapPin size={14} className="i-pin text-secondary-300 shrink-0 mt-0.5" />
                <span>
                  {CONTACT.localOffice.oneLine}
                  <span className="block text-brand-300 text-xs">Cox&apos;s Bazar office</span>
                </span>
              </span>
              <span className="flex items-start gap-2 text-sm">
                <MapPin size={14} className="i-pin [--d:1.2s] text-secondary-300 shrink-0 mt-0.5" />
                <span>
                  {CONTACT.address}
                  <span className="block text-brand-300 text-xs">Dhaka</span>
                </span>
              </span>
            </div>
            {/* Social links — absent entirely until a real URL is configured */}
            {socialLinks.length > 0 && (
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ name, href, Icon, bg }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center text-white transition-opacity hover:opacity-85`}
                >
                  <Icon />
                </a>
              ))}
            </div>
            )}
          </div>

          {/* Link columns — grouped so the payment banner can sit under just
              these three on desktop, in the space Brand's taller content
              leaves free, instead of spanning the whole footer width. */}
          <div className="col-span-2 lg:col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-10">
              {/* Company */}
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2.5">
                  {footerLinks.company.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2.5">
                  {footerLinks.support.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="col-span-2 lg:col-span-1">
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 lg:block lg:space-y-2.5">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* App-store buttons removed: there is no Tofiza app, and both
                    links pointed at "#". Restore this block when one ships. */}
              </div>
            </div>

            {/* Payment methods (desktop) — sits under the link columns only,
                in the space Brand's longer content leaves free. */}
            <div className="hidden lg:flex mt-8 justify-center">
              <Image
                src="/asset/ssl_banner.png"
                alt="Accepted payment methods — SSLCommerz verified"
                width={2116}
                height={271}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Payment methods (mobile/tablet) — full width below everything */}
        <div className="lg:hidden mt-8 flex justify-center">
          <Image
            src="/asset/ssl_banner.png"
            alt="Accepted payment methods — SSLCommerz verified"
            width={2116}
            height={271}
            className="h-auto w-full max-w-xl sm:max-w-2xl object-contain"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-brand-300 text-xs">
              © {year} Tofiza. All rights reserved. Registered in Bangladesh.
            </p>
            <a
              href="https://seltiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 text-xs hover:text-white transition-colors"
            >
              Developed by <span className="font-semibold">SELTIV</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}
