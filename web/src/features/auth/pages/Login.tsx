import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { googleLoginRequest, loginRequest } from "../api/auth.service";

import { useAuthStore } from "../stores/auth.store";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

type CredentialResponse = {
  credential?: string;
  clientId?: string;
  select_by?: string;
};

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      toast.loading("Logging in...");
      const res = await loginRequest(data);

      const { accessToken, user } = res.data;

      login({ token: accessToken, user });

      toast.dismiss();
      toast.success("Succesfully login");

      navigate("/");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to login");
    }
  };

  const handleUseDemoAccount = (role: "tenant" | "customer") => {
    const credentials = {
      tenant: {
        email: "tenant@mail.com",
        password: "password123",
      },
      customer: {
        email: "customer@mail.com",
        password: "password123",
      },
    };

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      setValue("email", credentials[role].email);
      setValue("password", credentials[role].password);
      handleSubmit(onSubmit)();
    } else {
      setValue("email", credentials[role].email);
      setValue("password", credentials[role].password);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Failed to login");
        return;
      }

      toast.loading("Logging in...");
      const res = await googleLoginRequest({
        token: credentialResponse.credential,
      });

      const { accessToken, user } = res.data;

      login({ token: accessToken, user });

      toast.dismiss();
      toast.success("Succesfully login");

      navigate("/");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to login");
    }
  };

  return (
    <main className=" bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-orange-200/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-pink-100/30 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-pattern opacity-40"></div>
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-white/20 to-orange-100/20"></div>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 place-items-center p-6 gap-12 lg:gap-20 max-w-7xl mx-auto w-full">
        <div className="w-full bg-white max-w-[520px]  glass-card dark:bg-slate-900/90 rounded-4xl shadow-[0_32px_64px_-16px_rgba(255,92,97,0.15)] p-8 md:p-12 border border-primary/40 dark:border-slate-800 ring-1 ring-primary/5 order-2 lg:order-1">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl text-primary mb-6 ring-4 ring-primary/5">
              <span className="material-symbols-outlined text-3xl font-bold">
                bedtime
              </span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Log in to your account to manage your bookings.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            id="loginForm"
          >
            <div className="space-y-2">
              <label
                className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-xl">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                  id="email"
                />
                {typeof errors.email?.message === "string" && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label
                  className="block text-sm font-bold text-slate-700 dark:text-slate-300"
                  htmlFor="password"
                >
                  Password
                </label>
              </div>
              <div className="relative group">
                <span
                  className={`material-symbols-outlined absolute left-4 top-7 -translate-y-1/2 ${showPassword ? "" : "text-primary"} transition-colors text-xl`}
                >
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={showPassword ? "abcdefghi" : "••••••••"}
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-4 bg-white/50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
                  id="password"
                />
                {typeof errors.password?.message === "string" && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password?.message}
                  </p>
                )}
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-8 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    id="password-icon"
                  >
                    visibility
                  </span>
                </button>
                <div className="flex justify-end">
                  <Link
                    className="text-xs mt-2 font-bold text-primary hover:opacity-80 transition-opacity"
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 py-1 ml-1">
              <input
                className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary/20 cursor-pointer"
                id="remember"
                type="checkbox"
              />
              <label
                className="text-sm text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"
                htmlFor="remember"
              >
                Keep me logged in
              </label>
            </div>
            <button
              disabled={isSubmitting}
              className={`w-full bg-primary hover:bg-primary/95 text-white font-extrabold py-4.5 rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              id="loginBtn"
              type="submit"
            >
              <span id="btnText">
                {isSubmitting ? "Logging in..." : "Log In"}
              </span>
              <svg
                className={`animate-spin h-5 w-5 text-white ${isSubmitting ? "" : "hidden"}`}
                fill="none"
                id="loadingSpinner"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={4}
                ></circle>
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </form>
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative w-full">
              {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
                <GoogleLogin
                  onSuccess={(credentialResponse) =>
                    handleGoogleLogin(credentialResponse)
                  }
                  onError={() => {
                    console.error("Login Failed");
                  }}
                  useOneTap={false}
                  containerProps={{
                    className: "absolute inset-0 opacity-0 w-full h-full",
                  }}
                />
              )}

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all font-bold text-slate-700 dark:text-slate-300"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                Google
              </button>
            </div>

            <button className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all font-bold text-slate-700 dark:text-slate-300">
              <svg
                className="w-5 h-5 fill-[#1877F2]"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              Facebook
            </button>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Don't have an account?
              <Link
                to="/register"
                className="text-primary font-extrabold hover:underline ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full max-w-[400px]  bg-white/95 backdrop-blur-sm dark:bg-slate-900/50 rounded-2xl border border-primary/40 dark:border-slate-800/50 p-8 shadow-2xl shadow-black/5 self-center order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <span className="material-symbols-outlined text-primary text-xl">
                info
              </span>
            </div>
            <h3 className="font-extrabold text-slate-800 dark:text-slate-200">
              Demo Accounts
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed font-medium">
            Use these demo accounts to explore the platform instantly.
          </p>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 group hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  Tenant Demo
                </p>
                <button
                  onClick={() => handleUseDemoAccount("tenant")}
                  className="text-[10px] font-bold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-all uppercase tracking-wider cursor-pointer"
                >
                  Use Account
                </button>
              </div>
              <code className="text-[11px] bg-slate-100 dark:bg-slate-900 px-2 py-1.5 rounded-lg font-mono text-slate-600 dark:text-slate-400 block w-full text-center border border-slate-200/40 dark:border-slate-700/40">
                tenant@mail.com
              </code>
            </div>
            <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 group hover:border-primary/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  Customer Demo
                </p>
                <button
                  onClick={() => handleUseDemoAccount("customer")}
                  className="text-[10px] font-bold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-all uppercase tracking-wider cursor-pointer"
                >
                  Use Account
                </button>
              </div>
              <code className="text-[11px] bg-slate-100 dark:bg-slate-900 px-2 py-1.5 rounded-lg font-mono text-slate-600 dark:text-slate-400 block w-full text-center border border-slate-200/40 dark:border-slate-700/40">
                customer@mail.com
              </code>
            </div>
          </div>
          <div
            className="mt-6 opacity-0 transition-opacity duration-300 text-center"
            id="feedback"
          >
            <span className="text-[11px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-100 dark:border-green-800">
              Credentials filled successfully!
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
