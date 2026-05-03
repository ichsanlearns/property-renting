import PasswordVisibility from "../../../shared/ui/PasswordVisibility";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changeEmailSchema,
  type ChangeEmailFormData,
} from "../schema/profile.schema";
import { useChangeEmail } from "../hooks/profile.mutation";

function ChangeEmailModal({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: changeEmail, isPending } = useChangeEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailSchema),
  });

  const onSubmit = (data: ChangeEmailFormData) => {
    changeEmail(data, { onSuccess: onClose });
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-body antialiased flex flex-col relative">
      <main className="grow flex items-center justify-center p-6 relative z-10">
        <div className="fixed inset-0 bg-surface-variant/80 backdrop-blur-sm z-0"></div>
        <div className="bg-surface rounded-xl shadow-lg border border-outline w-full max-w-md relative z-10 overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between">
            <h2 className="text-xl font-bold text-on-surface font-headline tracking-tight">
              Change Email
            </h2>
            <button
              disabled={isPending}
              onClick={() => onClose()}
              aria-label="Close modal"
              className={`text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-full ${
                isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-surface-variant cursor-pointer"
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                close
              </span>
            </button>
          </div>
          <div className="p-6 flex flex-col gap-6">
            <div className="bg-primary-container/30 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
              <span
                className="material-symbols-outlined text-primary mt-0.5"
                style={{
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                info
              </span>
              <div>
                <p className="text-sm font-medium text-on-tertiary-container font-headline">
                  Are you sure you want to change your email?
                </p>
                <p className="text-sm text-on-tertiary-container/80 mt-1">
                  Please confirm your password to verify this change.
                </p>
              </div>
            </div>
            <form
              id="change-email-form"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-on-surface font-label"
                  htmlFor="new-email"
                >
                  New Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    mail
                  </span>
                  <input
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/60"
                    id="email"
                    placeholder="Enter your new email address"
                    type="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-error">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-on-surface font-label flex justify-between"
                  htmlFor="current-password"
                >
                  Current Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    lock
                  </span>
                  <input
                    {...register("password")}
                    className="w-full pl-10 pr-10 py-3 bg-surface-container-lowest border border-outline rounded-lg text-on-surface text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/60"
                    id="password"
                    placeholder="Confirm your password to continue"
                    type={showPassword ? "text" : "password"}
                  />
                  <div className="absolute right-0 top-3/5 -translate-y-1/2">
                    <PasswordVisibility
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />
                  </div>
                </div>
                {errors.password && (
                  <p className="text-xs text-error">
                    {errors.password.message}
                  </p>
                )}
                <p className="text-xs text-on-surface-variant mt-1">
                  We need your current password to verify this change.
                </p>
              </div>
            </form>
          </div>
          <div className="px-6 py-5 bg-surface-container-low border-t border-surface-container flex items-center justify-end gap-3 rounded-b-xl">
            <button
              disabled={isPending}
              onClick={() => onClose()}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold text-on-surface transition-colors border border-transparent hover:border-outline  ${
                isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-surface-variant cursor-pointer"
              }`}
              type="button"
            >
              Cancel
            </button>
            <button
              disabled={isPending}
              form="change-email-form"
              className={`px-5 py-2.5 bg-primary text-on-primary rounded-lg text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all active:scale-95 duration-100 flex items-center gap-2 ${
                isPending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-surface-tint hover:opacity-90 cursor-pointer"
              }`}
              type="submit"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="animate-pulse">Sending...</span>
                </>
              ) : (
                <>
                  Send Verification
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChangeEmailModal;
