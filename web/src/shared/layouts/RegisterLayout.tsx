import { Outlet } from "react-router";

function RegisterLayout() {
  return (
    <main className="flex items-center min-h-screen justify-center px-4 pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/20 via-primary-fixed/30 to-background opacity-60"></div>
      <div
        className="absolute inset-0 z-0 bg-pattern opacity-40 mix-blend-multiply"
        data-alt="faint aerial landscape of rolling hills and rivers at sunset with a soft coral atmospheric haze"
      ></div>
      <Outlet />
      <div className="absolute top-32 right-20 hidden lg:block">
        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-white/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5c61] [font-variation-settings:'FILL'_1]">
              location_on
            </span>
            <span className="text-xs font-bold text-slate-800">
              Santorini, Greece
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterLayout;
