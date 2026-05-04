import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileFormData,
} from "../schemas/update-profile.schema";
import toast from "react-hot-toast";
import { fillProfileRequest } from "../api/auth.service";
import ProfilePhoto from "../components/ProfilePhoto";
import type { ImageType } from "../../tenant/property/types/image.type";

function FillData() {
  const [role, setRole] = useState<"CUSTOMER" | "TENANT">("CUSTOMER");
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = location.state;

  const { login, setUser } = useAuthStore();

  const [image, setImage] = useState<ImageType | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    login({ token, user });
  }, []);

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      toast.loading("Updating profile...");
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("role", role);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);

      if (data.phoneNumber) {
        formData.append("phoneNumber", data.phoneNumber);
      }

      if (image?.file) {
        formData.append("profileImage", image?.file);
      }

      const response = await fillProfileRequest(formData);

      toast.dismiss();
      toast.success("Profile filled successfully");
      setUser({ ...response.data?.user });
      navigate("/");
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (image: ImageType | null) => {
    setImage(image);
    setValue("profileImage", image?.file);
  };

  return (
    <div className="font-body bg-[#f8f5f5] text-on-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-warm-travel z-0"
        data-alt="Cinematic wide shot of a misty mountain range at sunrise with soft golden light hitting the peaks and deep orange hues in the sky"
      ></div>
      <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-[#0f172a]/40 z-1"></div>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="  font-headline text-2xl font-extrabold tracking-tight text-white">
          SewaHunian
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-linear-to-b from-slate-100/50 to-transparent">
        <div className="w-full z-10 max-w-xl bg-surface rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100/50">
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Step 2 of 2
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-4 tracking-tight">
              Tell us a bit about you
            </h2>
            <p className="text-on-surface-variant text-base mt-2">
              Help us personalize your experience
            </p>
          </div>
          <div className="mb-8">
            <div className="bg-surface-container p-1 rounded-full flex gap-1 items-center">
              <button
                onClick={() => setRole("CUSTOMER")}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-bold ${role === "CUSTOMER" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:bg-white/50 cursor-pointer"} transition-all`}
              >
                Customer
              </button>
              <button
                onClick={() => setRole("TENANT")}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-bold ${role === "TENANT" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:bg-white/50 cursor-pointer"} transition-all`}
              >
                <span
                  className="material-symbols-outlined text-lg"
                  data-icon="business"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  business
                </span>
                Tenant
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3 px-4">
              <span
                className="material-symbols-outlined text-primary text-sm"
                data-icon={role === "CUSTOMER" ? "info" : "business"}
              >
                {role === "CUSTOMER" ? "info" : "business"}
              </span>
              <p className="text-xs font-medium text-on-surface-variant">
                {role === "CUSTOMER"
                  ? "Find your dream home"
                  : "List and manage your properties"}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <ProfilePhoto image={image} onChange={handleChangeImage} />
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-3">
                Profile Photo
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                  First Name *
                </label>
                <input
                  {...register("firstName")}
                  className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                  placeholder="e.g. Julian"
                  type="text"
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                  Last Name *
                </label>
                <input
                  {...register("lastName")}
                  className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                  placeholder="e.g. Sterling"
                  type="text"
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">
                Phone Number (Optional)
              </label>
              <input
                {...register("phoneNumber")}
                className="w-full px-5 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary rounded-2xl text-sm font-medium placeholder:text-slate-400 transition-all"
                placeholder="087812345678"
                type="tel"
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="pt-6">
              <button
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white rounded-full font-bold text-base shadow-primary/25 shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
                {!isSubmitting && (
                  <span
                    className="material-symbols-outlined"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                )}
                {isSubmitting && (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
        © 2026 SewaHunian Hospitality Group
      </div>
    </div>
  );
}

export default FillData;
