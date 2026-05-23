import HeroSection from "@/components/home/heroSection.jsx";
import FeaturedEvents from "@/components/home/featuredEvents.jsx";
import Categories from "@/components/home/categories.jsx";
import UpcomingEvents from "@/components/home/upcomingEvents.jsx";
import HowItWorks from "@/components/home/howItWorks.jsx";

const page = () => {
  return (
    <main className="bg-gray-50">
      <HeroSection />
      <FeaturedEvents />
      <Categories />
      <UpcomingEvents />
      <HowItWorks />
    </main>
  );
};

export default page;
