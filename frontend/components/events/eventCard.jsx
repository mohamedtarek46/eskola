import Image from "next/image";
import Link from "next/link";
export default function EventCard({ event }) {
  const startDate = new Date(event.startDateTime);


  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* IMAGE WRAPPER */}
      <div className="relative h-36 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover z-10 "
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>

        <p className="text-xs text-gray-400 mt-1">
          {startDate.toLocaleDateString("en-EG")}
        </p>

        <p className="text-xs text-gray-400">{event.location.address}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900">
            {event.price === 0 ? "Free" : `$${event.price}`}
          </span>
          <Link href={`/events/${event._id.toString()}`}>
            <button className=" cursor-pointer  text-xs px-3 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 transition-colors">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
