type Props = {
  label: string;
  value: string;
};

function Row({ label, value }: Props) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 last:border-none last:pb-0">
      <span className="text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900 text-right">{value}</span>
    </div>
  );
}

export default Row;
