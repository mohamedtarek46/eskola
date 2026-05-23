import { MapPin } from "lucide-react";
export default function EventMap({ location }) {
  const fullAddress = ` ${location.address}`;

  const embedMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullAddress,
  )}`;

  return (
    <div className="rounded-3xl overflow-hidden border bg-white shadow-sm border-gray-400">
      {/* MAP */}
      <iframe
        src={embedMapUrl}
        width="100%"
        height="400"
        loading="lazy"
        className="border-0 w-full"
      />

      {/* INFO */}
      <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Event Location
          </h3>

          <p className="text-gray-500 mt-1">
            {location.venue}, {location.address}, {location.city}
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-2xl hover:opacity-90 transition"
        >
          <MapPin size={18} />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
