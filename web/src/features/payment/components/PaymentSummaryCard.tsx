import { formatRupiah } from "../../../shared/utils/price.util";
import Row from "./Row";

type Props = {
  data: any;
};

export default function PaymentSummaryCard({ data }: Props) {
  const roomPrice = Number(data.averageRoomPerNightSnapshot);
  const nights = Number(data.numberOfNights);

  const subtotal = roomPrice * nights;
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-xl font-black text-slate-900 mb-5">Payment Summary</h3>

      <div className="space-y-4 text-sm">
        <Row label="Room Price" value={`${formatRupiah(roomPrice)} x ${nights}`} />

        <Row label="Subtotal" value={formatRupiah(subtotal)} />

        <Row label="Taxes" value={formatRupiah(tax)} />

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="font-bold text-slate-900">Total</span>

          <span className="text-2xl font-black text-primary">{formatRupiah(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
