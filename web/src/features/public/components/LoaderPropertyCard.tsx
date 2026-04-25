function LoaderPropertyCard() {
  return (
    <div className="animate-pulse ">
      <div className="aspect-4/3 bg-slate-300 rounded-xl mb-3"></div>
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-full">
          <div className="h-4 bg-slate-300 rounded w-3/4"></div>
          <div className="h-3 bg-slate-300 rounded w-1/2"></div>
          <div className="h-4 bg-slate-300 rounded w-1/4 mt-2"></div>
        </div>
        <div className="h-4 bg-slate-300 rounded w-8"></div>
      </div>
    </div>
  );
}

export default LoaderPropertyCard;
