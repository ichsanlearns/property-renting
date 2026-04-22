type Props = {
  data: any;
};

export default function PaymentStatusSection({ data }: Props) {
  const isRejected = data.status === "REJECTED";

  if (isRejected) {
    return <StatusCard color="red" icon="cancel" title="Payment Rejected" desc={data.rejectionReason || "Your payment proof was rejected. Please upload again."} />;
  }

  if (data.status === "WAITING_PAYMENT") {
    return <StatusCard color="blue" icon="payments" title="Waiting for Payment" desc="Please upload your transfer receipt to continue booking confirmation." />;
  }

  if (data.status === "WAITING_CONFIRMATION") {
    return <StatusCard color="amber" icon="pending_actions" title="Under Review" desc="Our admin team is reviewing your payment proof." />;
  }

  if (data.status === "PAID") {
    return <StatusCard color="emerald" icon="check_circle" title="Payment Confirmed" desc="Your booking has been successfully paid." />;
  }

  if (data.status === "CANCELED") {
    return <StatusCard color="gray" icon="event_busy" title="Booking Cancelled" desc="This reservation has been cancelled." />;
  }

  return null;
}

type StatusProps = {
  title: string;
  desc: string;
  icon: string;
  color: "blue" | "amber" | "emerald" | "red" | "gray";
};

function StatusCard({ title, desc, icon, color }: StatusProps) {
  const styles = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",

    amber: "bg-amber-50 border-amber-200 text-amber-700",

    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",

    red: "bg-red-50 border-red-200 text-red-700",

    gray: "bg-slate-50 border-slate-200 text-slate-700",
  };

  return (
    <div className={`rounded-3xl border p-6 ${styles[color]}`}>
      <div className="flex items-start gap-4">
        <span className="material-symbols-outlined text-3xl">{icon}</span>

        <div>
          <h3 className="font-black text-lg">{title}</h3>

          <p className="text-sm mt-1 opacity-80">{desc}</p>
        </div>
      </div>
    </div>
  );
}
