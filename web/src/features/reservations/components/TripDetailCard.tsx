import { format } from "date-fns";
import Row from "./Row";

type Props = {
  data: any;
};

function TripDetailCard({ data }: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">travel</span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">Your Trip</h2>

          <p className="text-sm text-slate-500">Booking summary details</p>
        </div>
      </div>

      <div className="space-y-5 text-sm">
        <Row label="Property" value={data.propertyNameSnapshot} />

        <Row label="Room" value={data.roomNameSnapshot} />

        <Row label="Dates" value={`${format(new Date(data.checkInDate), "dd MMM yyyy")} - ${format(new Date(data.checkOutDate), "dd MMM yyyy")}`} />

        <Row label="Nights" value={`${data.numberOfNights} nights`} />
      </div>
    </div>
  );
}

export default TripDetailCard;
