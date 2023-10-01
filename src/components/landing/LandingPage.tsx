
import { LandingHero } from "./LandingHero";
import { LandingFeatures } from "./LandingFeatures";

export const LandingPage = () => {
  return (
    <div className="flex flex-col items-center text-center py-16 px-4 max-w-3xl mx-auto">
      <LandingHero />
      <LandingFeatures />
    </div>
  );
};
