/**
 * What Tofiza is selling today, in one place.
 *
 * The platform is built to carry many cities, but it launches with a single
 * one. Every guest-facing line that names a place — the hero prefill, the
 * homepage, the metadata, the footer — reads from here, so widening the launch
 * later is a config change rather than a copy hunt.
 */
export const LAUNCH = {
  city: "Cox's Bazar",
  country: "Bangladesh",
  /** The one-line description of the service, used wherever a blurb is needed. */
  tagline: "Verified beachside stays in Cox's Bazar, booked end to end.",
  /** Search-box hint: only places a guest can actually search for today. */
  searchHint: "e.g. Kolatoli, Cox's Bazar",
} as const;
