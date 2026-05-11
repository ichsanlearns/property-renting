import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";

export default function RevenueChart({ data }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg">Revenue over Time</h3>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 40, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis tickFormatter={(value) => Number(value).toLocaleString("id-ID")} />

            <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString("id-ID")}`} />

            <Line type="monotone" dataKey="revenue" stroke="#ff5c61" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
