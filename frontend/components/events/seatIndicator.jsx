export default function SeatIndicator({ availableSeats, totalSeats }) {
  const percentage = (availableSeats / totalSeats) * 100;
  const bookedSeats = totalSeats - availableSeats;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-gray-500">Available</p>
            <h3 className="font-bold text-xl text-green-600">
              {availableSeats}
            </h3>
          </div>
          <div>
            <p className="text-xs text-gray-500">Booked</p>
            <h3 className="font-bold text-xl text-red-400">
              {bookedSeats}
            </h3>
          </div>
        </div>

        <span className="text-sm font-medium text-gray-500">
          Total: {totalSeats}
        </span>
      </div>

      <div className="w-full bg-red-400 h-2 rounded-full overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-green-500 h-full rounded-full transition-all duration-300"
        />
      </div>
    </div>
  );
}