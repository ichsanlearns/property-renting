import type { ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

export default function Info({ label, children }: Props) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>

      <p className="font-bold text-slate-900">{children}</p>
    </div>
  );
}
