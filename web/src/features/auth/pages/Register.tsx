import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerRequest } from "../api/auth.service";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/register.schema";
import GoogleButtonWrapper from "../components/GoogleButtonWrapper";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      toast.loading("Registering...");
      const response = await registerRequest(data);
      toast.dismiss();
      toast.success(response.message);
      navigate("verify", {
        state: { email: data.email },
      });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
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
                  type="text"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <button
              disabled={isSubmitting || isLoggingIn}
              className={`w-full text-white flex items-center justify-center gap-2 py-4 rounded-full font-bold text-base shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all duration-200 ${
                isSubmitting || isLoggingIn
                  ? "bg-primary/50 cursor-not-allowed"
                  : "bg-primary text-on-primary cursor-pointer"
              }`}
              type="submit"
            >
              {isSubmitting || isLoggingIn ? (
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>
                    {isLoggingIn
                      ? "Logging in..."
                      : isSubmitting
                        ? "Registering..."
                        : "Register"}
                  </span>
                </div>
              ) : (
                <span>Register</span>
              )}
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
          <div className="relative my-10">
            <GoogleButtonWrapper
              isLoggingIn={isLoggingIn}
              setIsLoggingIn={setIsLoggingIn}
            />
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
    </>
  );
}

export default Register;
