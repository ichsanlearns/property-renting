export default function SpotlightCard({ data }: any) {
  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="relative h-full min-h-100 rounded-xl overflow-hidden shadow-lg flex flex-col justify-end p-8 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200')",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-[#b52330] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Spotlight: High Yield</span>

          <h4 className="text-2xl font-black font-headline mb-2">{data?.topProperty || "Premium Suite"}</h4>

          <p className="text-sm text-slate-300 mb-6 font-medium">Reaching strong booking performance this month.</p>

          <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-6">
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Monthly Rev</div>

              <div className="text-lg font-black">{data?.topRevenue || "$0"}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Growth</div>

              <div className="text-lg font-black text-emerald-400">+24%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
