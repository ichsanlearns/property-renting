import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCountdown } from "../../../shared/utils/countdown.util";
import { formatTime } from "../../../shared/utils/time.util";
import { useForm } from "react-hook-form";
import { resendTokenRequest } from "../api/auth.service";
import toast from "react-hot-toast";

function CheckEmail() {
  const location = useLocation();
  const { email } = location.state;
  const navigate = useNavigate();

  const [timer, setTimer] = useState(0);
  const [targetTime, setTargetTime] = useState(
    new Date().getTime() + 60 * 1000,
  );

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const timeLeft = useCountdown(targetTime);

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  useEffect(() => {
    const { seconds } = formatTime(timeLeft);

    setTimer(Number(seconds));
  }, [timeLeft]);

  const handleResendToken = async () => {
    try {
      toast.loading("Resending token...", {
        id: "resend-token",
      });
      const res = await resendTokenRequest({ email });

      setTargetTime(new Date(res.data.createdAt).getTime() + 60 * 1000);

      toast.dismiss("resend-token");
      toast.success(res.message);
    } catch (error: any) {
      toast.dismiss("resend-token");
      toast.error(error.response?.data?.message || "Failed to resend token");
    }
  };

  return (
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
          <p className="text-primary font-bold text-sm">{email}</p>
        </div>
        <form onSubmit={handleSubmit(handleResendToken)}>
          <div className="space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center justify-center gap-2 group ${timer > 0 ? "cursor-not-allowed opacity-70" : ""}`}
            >
              <span>
                {timer === 0 ? "Resend email" : `Resend in ${timer}s`}
              </span>
              {timer > 0 && (
                <span className="material-symbols-outlined animate-spin text-xl">
                  progress_activity
                </span>
              )}
              {timer === 0 && (
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
        </form>
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
  );
}

export default CheckEmail;
