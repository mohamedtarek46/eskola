import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="bg-white py-28 text-center px-4 border-b border-gray-100">
      <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-4">
        Events Platform
      </p>
      <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-tight tracking-tight">
        Discover & Book <br className="hidden md:block" /> Amazing Events
      </h1>
      <p className="mb-6 text-gray-400 mt-4 max-w-md mx-auto text-sm leading-relaxed">
        Find tech, music, sports and business events near you.
      </p>
      <Link
        href="/events"
        className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
      >
        Browse Events
      </Link>
      {/* <button className=" px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors cursor-pointer">
        Browse Events
      </button> */}
    </section>
  );
}
