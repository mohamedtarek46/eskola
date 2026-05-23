import EventMap from "./eventMap.jsx";
import SeatIndicator from "./seatIndicator.jsx";

export default function EventInfo({ event }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex gap-x-4">
          <div className=" px-4 py-1 rounded-full bg-black text-white text-sm font-medium">
            {event.categoryId.name}
          </div>
          <div
            className={` px-4 py-1 rounded-full bg-black text-white text-sm font-medium
            ${
              event.status === "draft"
                ? "bg-gray-500"
                : event.status === "published"
                  ? "bg-green-500"
                  : "bg-red-500"
            }
            `}
          >
            {event.status}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">{event.title}</h1>

        <p className="text-gray-500 mt-3 leading-7">{event.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-400">
          <p className="text-sm text-gray-500">Start</p>
          <p className="font-semibold mt-1">
            {new Date(event.startDateTime).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-400">
          <p className="text-sm text-gray-500">End</p>
          <p className="font-semibold mt-1">
            {new Date(event.endDateTime).toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-400">
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-semibold mt-1">{event.location.city}</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-400">
          <p className="text-sm text-gray-500">Price</p>
          <p className="font-semibold mt-1">
            {event.price} {event.currency}
          </p>
        </div>
      </div>

      <SeatIndicator
        availableSeats={event.availableSeats}
        totalSeats={event.capacity}
      />
      <EventMap location={event.location} />
    </div>
  );
}
