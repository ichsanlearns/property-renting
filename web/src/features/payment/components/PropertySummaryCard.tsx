import { format } from "date-fns";
import { formatRupiah } from "../../../shared/utils/price.util";
import Info from "./Info";

type Props = {
  data: any;
};

export default function PropertySummaryCard({ data }: Props) {
  const cover = data.roomType?.roomTypeImages?.find((img: any) => img.isCover)?.imageUrl || data.roomType?.roomTypeImages?.[0]?.imageUrl || "https://via.placeholder.com/400x300";

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <img src={cover} alt="Property" className="w-full h-64 object-cover" />

      <div className="p-7">
        <h2 className="text-2xl font-black text-slate-900">{data.propertyNameSnapshot}</h2>

        <p className="text-slate-500 mt-1">{data.roomNameSnapshot}</p>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <Info label="Check In">{format(new Date(data.checkInDate), "dd MMM yyyy")}</Info>

          <Info label="Check Out">{format(new Date(data.checkOutDate), "dd MMM yyyy")}</Info>

          <Info label="Total Nights">{data.numberOfNights} nights</Info>

          <Info label="Total Payment">{formatRupiah(Number(data.totalAmount))}</Info>
        </div>
      </div>
    </div>
  );
}
