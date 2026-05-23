export default function OrganizerCard({ organizer }) {
  return (
    <div className="border rounded-3xl p-6 border-gray-400">
      <h2 className="text-2xl font-bold mb-5">
        Organizer
      </h2>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200" />
        <div>
          <h3 className="font-semibold text-lg">
            {organizer.firstName + " " + organizer.lastName}
          </h3>
          <p className="text-gray-500">
            {organizer.email}
          </p>
        </div>
      </div>
    </div>
  );
}