import type { FAQ } from "@/lib/types";
import { CONTACT } from "@/lib/config/contact";

/**
 * Editorial copy for the launch city.
 *
 * Distances and travel times are deliberately given as ranges: they come from
 * travel guides rather than a survey, and a precise number we cannot stand
 * behind is worse than an honest "about". Live facts — which stays exist, what
 * they cost, how guests rated them — never live here; they come from the
 * database.
 */

export interface CoastPlace {
  id: string;
  name: string;
  /** Short label for the pill on the map. */
  kind: string;
  blurb: string;
  /** How far from Kolatoli, where our stays are. Approximate by design. */
  fromKolatoli: string;
  /** Matched against a hotel's `location` to decide whether we have stays here. */
  match: RegExp;
  /** Position on the coast illustration, as a percentage of its height. */
  at: number;
}

/** North to south along the coast. */
export const COAST: CoastPlace[] = [
  {
    id: "kolatoli",
    name: "Kolatoli",
    kind: "Hotel zone",
    blurb:
      "The busiest stretch of the main beach and the heart of the hotel-motel zone. Restaurants, shops and the sea within easy reach of your door.",
    fromKolatoli: "You are here",
    match: /kolatoli/i,
    at: 8,
  },
  {
    id: "sugandha",
    name: "Sugandha",
    kind: "Main beach",
    blurb:
      "The long central beach beside Kolatoli and Laboni — the classic Cox's Bazar sunset walk, with horse rides, kite sellers and street food on the sand.",
    fromKolatoli: "A short ride",
    match: /sugandha/i,
    at: 24,
  },
  {
    id: "laboni",
    name: "Laboni",
    kind: "Main beach",
    blurb:
      "The town's best-known beach point, close to the markets and restaurants. Lively from late afternoon until well after dark.",
    fromKolatoli: "About 15 minutes",
    match: /laboni/i,
    at: 38,
  },
  {
    id: "himchari",
    name: "Himchari",
    kind: "Hills & waterfall",
    blurb:
      "Where the hills meet the sea along Marine Drive. A calmer beach, a viewpoint and a small waterfall that runs best after the rains.",
    fromKolatoli: "Roughly 10–12 km south",
    match: /himchari/i,
    at: 56,
  },
  {
    id: "inani",
    name: "Inani",
    kind: "Quiet beach",
    blurb:
      "A wide, quieter beach with rocky outcrops, south of town along Marine Drive. Far less crowded than the main beach.",
    fromKolatoli: "Roughly 20–30 km south",
    match: /inani/i,
    at: 74,
  },
  {
    id: "teknaf",
    name: "Teknaf & Saint Martin's",
    kind: "Day trip, seasonal",
    blurb:
      "The far end of Marine Drive, and the jetty for Saint Martin's Island. Boats generally run in the dry season and stop in the monsoon, subject to official approval — check current notices before planning a trip.",
    fromKolatoli: "A long day's drive",
    match: /teknaf|saint martin|st\.? martin/i,
    at: 92,
  },
];

export type SeasonTier = "peak" | "warm" | "monsoon" | "opening";

export const SEASON_TIERS: Record<SeasonTier, { label: string; note: string }> = {
  peak: {
    label: "Best season",
    note: "Cooler, drier days and a calmer sea. The busiest and most popular months, so book early.",
  },
  warm: {
    label: "Warm & quieter",
    note: "Hotter days, thinner crowds and easier availability. Good for a relaxed stay.",
  },
  monsoon: {
    label: "Monsoon",
    note: "Heavy rain and a rougher sea; swimming is often restricted. Fewer visitors and usually lower rates.",
  },
  opening: {
    label: "Season opens",
    note: "The rains ease and visitors return. Weather can still turn, so keep an eye on the forecast.",
  },
};

export const MONTHS: { short: string; long: string; tier: SeasonTier }[] = [
  { short: "Jan", long: "January", tier: "peak" },
  { short: "Feb", long: "February", tier: "peak" },
  { short: "Mar", long: "March", tier: "warm" },
  { short: "Apr", long: "April", tier: "warm" },
  { short: "May", long: "May", tier: "monsoon" },
  { short: "Jun", long: "June", tier: "monsoon" },
  { short: "Jul", long: "July", tier: "monsoon" },
  { short: "Aug", long: "August", tier: "monsoon" },
  { short: "Sep", long: "September", tier: "monsoon" },
  { short: "Oct", long: "October", tier: "opening" },
  { short: "Nov", long: "November", tier: "peak" },
  { short: "Dec", long: "December", tier: "peak" },
];

export const GETTING_THERE = [
  {
    id: "air",
    mode: "By air",
    time: "About 1 hour",
    detail: "Nonstop from Dhaka to Cox's Bazar's own airport, a short drive from the hotel zone.",
  },
  {
    id: "road",
    mode: "By road",
    time: "About 8½–10 hours",
    detail: "Overnight and daytime buses run from Dhaka. The cheapest option, and the longest.",
  },
  {
    id: "rail",
    mode: "By train",
    time: "About 8–9 hours",
    detail: "A direct rail line now reaches Cox's Bazar. Comfortable seating, fixed timetable.",
  },
] as const;

/** The four steps between a search and a confirmed booking, as the product really works. */
export const BOOKING_STEPS = [
  {
    id: "search",
    title: "Search your dates",
    body: "Pick Cox's Bazar and your dates. You see live rates for rooms that are genuinely open that night.",
  },
  {
    id: "hold",
    title: "We hold your room",
    body: "Choosing a room holds it for 15 minutes while you enter guest details, so nobody books it from under you.",
  },
  {
    id: "pay",
    title: "Pay on a secure page",
    body: "Cards, bKash, Nagad, Rocket or internet banking, through SSLCommerz. We never see or store your card number.",
  },
  {
    id: "confirmed",
    title: "Confirmed, with an invoice",
    body: "The moment payment clears you get an email invoice and a booking reference starting TFZ. Show it at check-in.",
  },
] as const;

export type PromiseIcon = "verified" | "price" | "secure" | "instant" | "match" | "support";

export const PROMISES: { icon: PromiseIcon; title: string; body: string }[] = [
  {
    icon: "verified",
    title: "Verified before it is listed",
    body: "Every property is checked by our team before it goes live, and reviews come only from guests who actually stayed.",
  },
  {
    icon: "price",
    title: "The price you see is the price you pay",
    body: "Taxes, fees and any extras are in the total before you reach the payment page. Our commission comes from the property's share, never your bill.",
  },
  {
    icon: "secure",
    title: "Secure payments",
    body: "Payment happens on SSLCommerz's page, not ours. Pay by card, bKash, Nagad, Rocket or internet banking.",
  },
  {
    icon: "instant",
    title: "Instant confirmation",
    body: "Your booking is confirmed and your invoice emailed the moment payment clears.",
  },
  {
    icon: "match",
    title: "Best price guarantee",
    body: "Found a lower price elsewhere? We will match it and refund the difference.",
  },
  {
    icon: "support",
    title: "People, day and night",
    body: `Support is answered by a person at any hour on ${CONTACT.phone} — and our Cox's Bazar office in Kolatoli is open to walk into.`,
  },
];

/**
 * Guest-facing answers. Keep these true to what the platform actually does —
 * hotels are live in Cox's Bazar, flights are not — and route every enquiry to
 * the single support address in lib/config/contact.ts.
 */
export const faqs: FAQ[] = [
  {
    id: "faq-001",
    question: "How do I book a hotel on Tofiza?",
    answer:
      "Search Cox's Bazar with your dates, then compare properties and pick a room. Choosing a room holds it for 15 minutes while you enter guest details and pay on our gateway's secure page. As soon as the payment clears, your booking is confirmed, the property is notified, and your invoice arrives by email with a booking reference starting TFZ — show that at check-in.",
  },
  {
    id: "faq-002",
    question: "Which part of Cox's Bazar are your hotels in?",
    answer:
      "Our stays are in and around Kolatoli, the heart of the hotel-motel zone, on or close to the main beach. Each listing shows its exact location and how far it is from the centre. We will add more of the coast as more properties join.",
  },
  {
    id: "faq-003",
    question: "Can I cancel or change my booking?",
    answer:
      "Cancel any time from My Bookings. What comes back depends on the rate you booked: refundable rates are refunded in full if you cancel before the cut-off shown on the room, commonly 24 hours before check-in, and non-refundable rates are not refunded. The page tells you the exact refund amount before you confirm. To change dates, cancel and rebook if your rate allows it, or call us and we will help.",
  },
  {
    id: "faq-004",
    question: "What payment methods do you accept?",
    answer:
      "Credit and debit cards including Visa and Mastercard, the mobile wallets bKash, Nagad and Rocket, and internet banking — all handled by SSLCommerz. You enter your payment details on their secure page, never on ours, so we never see or store your card number.",
  },
  {
    id: "faq-005",
    question: "How do I get my confirmation and invoice?",
    answer:
      "Both are emailed to you the moment your payment is confirmed, with a full breakdown of the room, any extras, taxes and fees. You can also open the booking any time under My Bookings. If nothing has arrived within a few minutes, check your spam folder, then contact us with the name and dates you booked under.",
  },
  {
    id: "faq-006",
    question: "Is it safe to book hotels through Tofiza?",
    answer:
      "Every property is checked by our team before it goes live, and the reviews you see are written by guests who actually stayed. Payment is taken through SSLCommerz rather than by us directly. If a property cannot honour a booking we have confirmed, you are refunded in full regardless of the rate, and we will help you find a comparable alternative for the same dates.",
  },
  {
    id: "faq-007",
    question: "When is the best time to visit Cox's Bazar?",
    answer:
      "Roughly November to February: cooler, drier days and a calmer sea, which also makes it the busiest and priciest stretch, so book early. March and April are hotter and quieter. From May to September the monsoon brings heavy rain and a rough sea, with fewer visitors and usually lower rates. Weather is never guaranteed, so check the forecast before you travel.",
  },
  {
    id: "faq-008",
    question: "How do I get to Cox's Bazar?",
    answer:
      "From Dhaka it is about an hour by air, roughly 8½ to 10 hours by bus, or around 8 to 9 hours by train. Many of our stays offer airport pick-up — check the amenities on each listing — and our team can help you plan the last leg by phone.",
  },
  {
    id: "faq-009",
    question: "Can I book flights on Tofiza?",
    answer:
      "Not yet. Hotel booking is live in Cox's Bazar, and flights are in progress — the Flight tab on the homepage will open for bookings once airline fares and ticketing are in place. Nothing on the site can currently be booked as a flight.",
  },
  {
    id: "faq-010",
    question: "Do you handle group bookings?",
    answer:
      "Yes. For several rooms, a long stay, or a family, corporate or event booking, call us or email support@tofiza.com with your dates and room count, and we will put rates together for you rather than having you book room by room.",
  },
  {
    id: "faq-011",
    question: "Do you have an office in Cox's Bazar?",
    answer: `Yes. Visit us at ${CONTACT.localOffice.oneLine}, or call ${CONTACT.phone} any time. Booking problems are much easier to solve with a person who can walk down the road.`,
  },
];
