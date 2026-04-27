import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdatePasswordFormData } from "../schemas/update-password.schema";
import { updatePasswordSchema } from "../schemas/update-password.schema";
import { updatePasswordRequest } from "../api/auth.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePasswordToken } from "../hooks/useAuth";

function Password() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const { data, isLoading, isError } = usePasswordToken({ token });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      toast.loading("Updating password...");

      const res = await updatePasswordRequest({
        ...data,
        token,
      });
      toast.dismiss();
      toast.success(res.message);
      navigate("/fill-data", {
        state: { token: res.data.accessToken, user: res.data.user },
      });
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    toast.error("Invalid or expired token");
    navigate("/login");
  }

  return (
    <main className="w-full z-10 max-w-md">
      <div className="bg-surface rounded-xl shadow-2xl p-8 md:p-10 border border-outline-variant relative overflow-hidden">
        <div className="flex justify-center mb-8">
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            SewaHunian
          </span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-on-surface text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Set your password
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Create a secure password to protect your account and trips.
          </p>
          <br />
          <p className="text-on-surface-variant text-sm font-medium">Email:</p>
          <p className="text-sm text-primary font-medium">{data?.email}</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.error(errors);
          })}
          className="space-y-6"
        >
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block ml-1">
              New Password
            </label>
            <div className="relative group">
              <input
                className="w-full px-5 py-4 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-slate-300"
                placeholder={showPassword ? "abcdefghi" : "••••••••"}
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                type="button"
              >
                <span
                  className={`material-symbols-outlined ${
                    showPassword ? "text-primary" : ""
                  }`}
                >
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
            {errors.password?.message && (
              <p className="text-xs text-error font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <input
                className="w-full px-5 py-4 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-slate-300"
                placeholder={showConfirmPassword ? "abcdefghi" : "••••••••"}
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
              />
              <button
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                title={showConfirmPassword ? "Hide password" : "Show password"}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                type="button"
              >
                <span
                  className={`material-symbols-outlined ${
                    showConfirmPassword ? "text-primary" : ""
                  }`}
                >
                  {showConfirmPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
            {errors.confirmPassword?.message && (
              <p className="text-xs text-error font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="pt-4">
            <button
              className={`w-full bg-primary text-on-primary font-bold py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 text-base ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-90"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Confirming...
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
      </div>
      <div className="mt-8 flex justify-center items-center gap-6">
        <a
          className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Help Center
        </a>
        <span className="w-1 h-1 bg-outline rounded-full"></span>
        <a
          className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Privacy Policy
        </a>
        <span className="w-1 h-1 bg-outline rounded-full"></span>
        <a
          className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Terms
        </a>
      </div>
    </main>
  );
}

export default Password;
