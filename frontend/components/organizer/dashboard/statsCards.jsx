import { CalendarDays, Zap, Ticket, DollarSign } from "lucide-react";

export default function StatsCards({ stats }) {
  const items = [
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: CalendarDays,
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      label: "Active Events",
      value: stats.activeEvents,
      icon: Zap,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: Ticket,
      color: "text-sky-500",
      bg: "bg-sky-50",
    },
    {
      label: "Revenue",
      value: `$${stats.revenue}`,
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className={`inline-flex p-2 rounded-xl ${bg} mb-3`}>
            <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
          </div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            {label}
          </p>
          <h2 className="text-2xl font-semibold text-gray-800">{value}</h2>
        </div>
      ))}
    </div>
  );
}