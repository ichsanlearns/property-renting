import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerRequest } from "../api/auth.service";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      toast.loading("Registering...");
      const response = await registerRequest(data);
      toast.dismiss();
      toast.success(response.message);
      navigate("check-email", { state: { email: data.email } });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <main className="flex items-center min-h-screen justify-center px-4 pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-linear-to-br from-primary/20 via-primary-fixed/30 to-background opacity-60"></div>
        <div
          className="absolute inset-0 z-0 bg-pattern opacity-40 mix-blend-multiply"
          data-alt="faint aerial landscape of rolling hills and rivers at sunset with a soft coral atmospheric haze"
        ></div>
        <div className="relative z-10 w-full max-w-[440px] bg-[#ffffff] rounded-4xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 md:p-10">
            <div className="flex justify-center mb-8">
              <div className="w-12 h-1 bg-primary/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-primary"></div>
              </div>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-[1.875rem] font-extrabold text-on-[#ffffff] leading-tight mb-2 tracking-tight">
                Create your account
              </h1>
              <p className="text-on-[#ffffff]-variant font-medium">
                Enter your email to get started
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-on-[#ffffff]-variant px-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full px-5 py-4 rounded-xl bg-[#f1eeee] border-transparent focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-200 text-on-[#ffffff] font-medium placeholder:text-slate-400"
                    placeholder="name@example.com"
                    type="email"
                    {...register("email")}
                  />
                </div>
              </div>
              <button
                className={`w-full py-4 rounded-full font-bold text-base shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 ${
                  isSubmitting
                    ? "bg-primary/50 cursor-not-allowed"
                    : "bg-primary text-on-primary"
                }`}
                type="submit"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </form>
            <div className="relative my-8">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  or continue with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  Google
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-100 hover:bg-slate-50 active:scale-95 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  GitHub
                </span>
              </button>
            </div>
            <div className="text-center">
              <p className="text-on-[#ffffff]-variant font-medium text-sm">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary font-bold hover:underline underline-offset-4 ml-1"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
          <div className="bg-primary/5 p-6 border-t border-primary/10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-xl [font-variation-settings:'FILL'_1]">
                stars
              </span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                Member Perks
              </p>
              <p className="text-xs text-on-[#ffffff]-variant leading-tight">
                Unlock exclusive member-only pricing and earn rewards on every
                booking.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-20 left-10 hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/50">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                data-alt="luxury hotel lobby with warm lighting and marble floors"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-4-eHMRXhFjqdA5yCV5jN3YDApjNwJnitDAe0eHt9HqHx38gaITGcyeqIeuGVBLtTh58rfqg-mKs8PiTKQgrc4n5IOjHOSaFxUVHSIYpckDM6aWpV1N3bQsxfZme-d30JsOyDFtA-cSR4xbx_4oF1XR1eA3c4rdbjE3G1-ZpDFLY-Lfq-29XZWjrQTrMDXvyD56T5_xvttqvYB8yJMbMDtJVCofMcFpgv7bGWm2JuJpCy3rh2IKXilmk_smxKhJ2ItpPmVddbs_01"
              />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">The Ritz-Paris</p>
              <div className="flex items-center text-[10px] text-primary">
                <span className="material-symbols-outlined text-xs [font-variation-settings:'FILL'_1]">
                  star
                </span>
                <span className="font-bold ml-1">4.9 (2k+ reviews)</span>
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
}

export default Register;
