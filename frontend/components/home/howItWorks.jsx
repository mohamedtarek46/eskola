const steps = [
  { title: "Browse Events", desc: "Explore events by category or search" },
  { title: "Book Ticket", desc: "Choose seats and confirm booking" },
  { title: "Enjoy", desc: "Attend and enjoy your event" },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-medium tracking-widest text-gray-400 uppercase mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="w-9 h-9 mx-auto mb-4 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {i + 1}
              </div>
              <h3 className="font-medium text-gray-900">{s.title}</h3>
              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}