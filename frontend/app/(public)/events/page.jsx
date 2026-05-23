import FilterSection from "@/components/events/filterSection.jsx";
import Events from "@/components/events/events.jsx";
const page = () => {
  return (
    <div
      className="container grid grid-cols-1 md:grid-cols-[266px_1fr] gap-10 md:mt-16 relative"
      id="box"
    >
      <FilterSection />
      <Events />
    </div>
  );
};

export default page;
