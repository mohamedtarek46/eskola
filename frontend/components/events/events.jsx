import EventsList from "./eventList.jsx";
import EventSearchBar from "./eventSearchBar.jsx";
import Link from "next/link";
const Events = () => {
  return (
    <div>
      <p className="text-[12px] font-bold hidden md:block">
        <Link className="text-black/60" href="/home ">
          Home
        </Link>
        / Events
      </p>
      <EventSearchBar />
      <EventsList />
    </div>
  );
};

export default Events;
