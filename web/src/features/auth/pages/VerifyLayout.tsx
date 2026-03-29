import { Outlet } from "react-router";

function VerifyLayout() {
  return (
    <div className="font-body bg-[#f8f5f5] text-on-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-warm-travel z-0"
        data-alt="Cinematic wide shot of a misty mountain range at sunrise with soft golden light hitting the peaks and deep orange hues in the sky"
      ></div>
      <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-[#0f172a]/40 z-1"></div>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="  font-headline text-2xl font-extrabold tracking-tight text-white">
          StayHub
        </div>
      </header>
      <Outlet />
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
        © 2024 StayHub Hospitality Group
      </div>
    </div>
  );
}

export default VerifyLayout;
