type Props = {
  label: string;
  value: string;
};

export default function Row({ label, value }: Props) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900 text-right">{value}</span>
    </div>
  );
}
