import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UpdatePasswordFormData } from "../schemas/update-password.schema";
import { updatePasswordSchema } from "../schemas/update-password.schema";
import { updatePasswordRequest } from "../api/auth.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Password() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<UpdatePasswordFormData>({
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
      navigate("/register/verify/fill-data");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <main className="w-full z-10 max-w-md">
      <div className="bg-surface rounded-xl shadow-2xl p-8 md:p-10 border border-outline-variant relative overflow-hidden">
        <div className="flex justify-center mb-8">
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            StayHub
          </span>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-on-surface text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
            Set your password
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            Create a secure password to protect your account and trips.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log(errors);
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
                placeholder="••••••••"
                type="password"
                {...register("password")}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                type="button"
              >
                <span
                  className="material-symbols-outlined"
                  data-icon="visibility"
                >
                  visibility
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="w-full px-5 py-4 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-slate-300"
                placeholder="••••••••"
                type="password"
                {...register("confirmPassword")}
              />
            </div>
          </div>
          <div className="pt-4">
            <button
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 text-base"
              type="submit"
            >
              Confirm
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
