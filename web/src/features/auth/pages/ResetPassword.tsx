import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../schemas/reset-password.schema";
import type { ResetPasswordFormData } from "../schemas/reset-password.schema";
import toast from "react-hot-toast";
import { resetPasswordRequest } from "../api/auth.service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      toast.loading("Resetting password...");
      const response = await resetPasswordRequest({
        password: data.password,
        token: token!,
      });
      toast.dismiss();
      toast.success(response.message);
      navigate("/login");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <main className="grow flex items-center justify-center p-6 relative overflow-hidden bg-mesh">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-tertiary/10 rounded-full blur-3xl"></div>
        <div className="w-full max-w-md z-10">
          <div className="flex justify-center mb-8">
            <span className="text-2xl font-extrabold text-primary tracking-tight">
              StayHub
            </span>
          </div>
          <div className="bg-surface rounded-xl shadow-2xl p-8 md:p-10 border border-outline/30 backdrop-blur-sm">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface leading-tight">
                Set a new password
              </h1>
              <p className="text-on-surface-variant text-sm mt-2">
                Please choose a password that you haven't used before.
              </p>
            </header>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block ml-1">
                  New password
                </label>
                <div className="relative group">
                  <input
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-lg text-on-surface placeholder:text-slate-300 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="••••••••"
                    type="password"
                    {...register("password")}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block ml-1">
                  Confirm password
                </label>
                <div className="relative group">
                  <input
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3.5 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-lg text-on-surface placeholder:text-slate-300 transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="••••••••"
                    type="password"
                    {...register("confirmPassword")}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary p-1"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined text-xl"
                      data-icon="visibility_off"
                    >
                      visibility_off
                    </span>
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                className={`w-full bg-primary text-on-primary py-4 rounded-full font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all mt-4 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                type="submit"
              >
                {isSubmitting ? "Updating password..." : "Update Password"}
              </button>
            </form>
            <div className="mt-8 text-center">
              <a
                className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2"
                href="/login"
              >
                <span
                  className="material-symbols-outlined text-base"
                  data-icon="arrow_back"
                >
                  arrow_back
                </span>
                Back to login
              </a>
            </div>
          </div>
          <p className="text-center mt-10 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Securely encrypted by Coral Horizon Cloud
          </p>
        </div>
      </main>
      <footer className="bg-[#f8f5f5] dark:bg-slate-950 w-full py-8 flex flex-col items-center gap-4 mt-auto">
        <div className="flex gap-6">
          <a
            className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-wider font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-wider font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-wider font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors opacity-80 hover:opacity-100"
            href="#"
          >
            Support
          </a>
        </div>
        <p className="font-['Plus_Jakarta_Sans'] text-[10px] uppercase tracking-wider font-bold text-slate-500">
          © 2024 Coral Horizon Hospitality. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default ResetPassword;
