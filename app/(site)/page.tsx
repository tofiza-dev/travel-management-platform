import Hero from "@/components/home/Hero";
import ProofStrip from "@/components/home/ProofStrip";
import CoastIntro from "@/components/home/CoastIntro";
import CoastSection from "@/components/home/CoastSection";
import FeaturedStays from "@/components/home/FeaturedStays";
import Offers from "@/components/home/Offers";
import HowItWorks from "@/components/home/HowItWorks";
import PlanTrip from "@/components/home/PlanTrip";
import TrustAndOffice from "@/components/home/TrustAndOffice";
import GuestVoices from "@/components/home/GuestVoices";
import FAQ from "@/components/home/FAQ";

/**
 * Tofiza launches in one city, so the page describes that city honestly: the
 * hero is the search box, everything after it is either live data (stays,
 * offers, reviews) or written copy about Cox's Bazar. Anything that depends on
 * data hides itself when there is nothing real to show.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProofStrip />
      <CoastIntro />
      <CoastSection />
      <FeaturedStays />
      <Offers />
      <HowItWorks />
      <PlanTrip />
      <TrustAndOffice />
      <GuestVoices />
      <FAQ />
    </main>
  );
}
