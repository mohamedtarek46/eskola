export default function ProfileTabs({ tab, setTab }) {
  const tabs = ["profile", "bookings"];

  return (
    <div className="flex gap-6 mt-8 border-b border-border">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`pb-2 text-small capitalize transition cursor-pointer ${
            tab === t
              ? "border-b-2 border-primary text-text-primary font-semibold"
              : "text-text-muted"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}