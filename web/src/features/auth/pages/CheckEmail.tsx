import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

function CheckEmail() {
  const [timeLeft, setTimeLeft] = useState(60);

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
      <main className="relative z-10 w-full max-w-md">
        <div className="bg-[#ffffff]/90 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl text-center border border-white/20">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150 opacity-25"></div>
              <div
                className="absolute inset-0 bg-primary/10 rounded-full animate-ping scale-125 opacity-40"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="relative w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/25">
                <span
                  className="material-symbols-outlined text-white text-5xl"
                  data-icon="mark_email_unread"
                >
                  mark_email_unread
                </span>
              </div>
            </div>
          </div>
          <h1 className="font-headline text-3xl font-extrabold text-on-[#ffffff] mb-3 tracking-tight">
            Check your email
          </h1>
          <p className="text-on-[#ffffff]-variant text-base font-medium mb-1">
            We sent a confirmation link to your email
          </p>
          <div className="inline-block px-4 py-1.5 bg-[#ffffff]-container rounded-full mb-8">
            <p className="text-primary font-bold text-sm">j***@gmail.com</p>
          </div>
          <div className="space-y-4">
            <button
              disabled={timeLeft > 0}
              className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center justify-center gap-2 group ${timeLeft > 0 ? "cursor-not-allowed opacity-70" : ""}`}
            >
              <span>{timeLeft === 0 ? "Resend email" : "Resend in 30s"}</span>
              {timeLeft > 0 && (
                <span className="material-symbols-outlined animate-spin text-xl">
                  progress_activity
                </span>
              )}
              {timeLeft === 0 && (
                <span
                  className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform"
                  data-icon="send"
                >
                  send
                </span>
              )}
            </button>
            <p className="text-on-[#ffffff]-variant text-sm font-medium">
              Didn`t receive it?
              <span className="inline-block text-primary hover:underline font-bold transition-all">
                &nbsp;Check spam.
              </span>
            </p>
          </div>
          <div className="mt-10 pt-8 border-t border-[#ffffff]-container-high">
            <Link
              className="inline-flex items-center gap-2 text-on-[#ffffff]-variant hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider"
              to="/login"
            >
              <span
                className="material-symbols-outlined text-lg"
                data-icon="arrow_back"
              >
                arrow_back
              </span>
              Back to login
            </Link>
          </div>
        </div>
      </main>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
        © 2024 StayHub Hospitality Group
      </div>
    </div>
  );
}

export default CheckEmail;
