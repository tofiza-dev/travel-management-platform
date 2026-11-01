import { cacheLife, cacheTag } from "next/cache";
import { getLaunchSnapshot } from "@/lib/services/public-hotels";
import { COAST } from "@/lib/content/coxs-bazar";
import { LAUNCH } from "@/lib/config/launch";
import { tags } from "@/lib/cache/tags";
import SectionHeading from "./SectionHeading";
import CoastMap, { type MapPlace } from "./CoastMap";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Editorial places, live stay counts. The places and their descriptions are
 * written copy; which of them have a Tofiza stay comes from where the published
 * hotels actually are, so the map cannot drift from the inventory.
 */
export default async function CoastSection() {
  "use cache";
  cacheLife("hours");
  cacheTag(tags.home(), tags.hotels());

  const snap = await getLaunchSnapshot(LAUNCH.city);

  const places: MapPlace[] = COAST.map(({ match, ...place }) => ({
    ...place,
    stays: snap.locations.filter((loc) => match.test(loc)).length,
  }));

  return (
    <section id="coast" className="relative bg-sand-100 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <SectionHeading
          eyebrow="The coast, mapped"
          title={
            <>
              Choose your stretch of <span className="italic text-secondary-600">shoreline</span>
            </>
          }
          lede="Our stays are in Kolatoli, in the middle of everything. Tap along the coast to see what lies a short ride away."
        />
        <Reveal y={40}>
          <CoastMap places={places} />
        </Reveal>
      </div>
    </section>
  );
}
