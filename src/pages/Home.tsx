import { CtaSection } from "../components/home/CtaSection";
import { FaqSection } from "../components/home/FaqSection";
import FeaturedCourses from "../components/home/FeaturedCourses";
import HeroSection from "../components/home/HeroSection";

const Home = () => {
  return (
    <div className="bg-white text-secondary">
      <HeroSection />
      <FeaturedCourses />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default Home;
