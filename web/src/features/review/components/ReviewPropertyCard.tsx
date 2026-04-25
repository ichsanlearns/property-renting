import { format } from "date-fns";

export default function ReviewPropertyCard({ data }: any) {
  const image = data.roomType?.roomTypeImages?.find((img: any) => img.isCover)?.imageUrl || data.roomType?.roomTypeImages?.[0]?.imageUrl;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-5">
      <div
        className="w-24 h-24 md:w-32 md:h-24 bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="flex-1">
        <span className="text-[10px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Past Stay</span>

        <h3 className="text-lg font-bold mt-1 text-slate-900 dark:text-white">{data.propertyNameSnapshot}</h3>

        <p className="text-sm text-slate-500">
          {data.roomNameSnapshot} • {format(new Date(data.checkInDate), "MMM dd")} - {format(new Date(data.checkOutDate), "MMM dd, yyyy")}
        </p>
      </div>
    </div>
  );
}
