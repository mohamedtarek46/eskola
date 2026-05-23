const Skeleton = () => {
  const Card = ()=>(
    <div className="animate-pulse">
      <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-300"></div>

      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>

        <div className="h-4 bg-gray-300 rounded w-1/3"></div>

        <div className="flex justify-between mt-3">
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <Card key={i} />
      ))}
    </>
  );
};

export default Skeleton;
