import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../auth/stores/auth.store";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import {
  passwordSchema,
  profileSchema,
  type PasswordFormData,
  type ProfileFormData,
} from "../schema/profile.schema";
import toast from "react-hot-toast";
import { updateMeRequest } from "../api/profile.service";
import ProfilePhoto from "../../auth/components/ProfilePhoto";
import type { ImageType } from "../../tenant/property/types/image.type";
import {
  useDeleteProfilePhoto,
  useUpdatePassword,
  useUpdateProfileImage,
} from "../hooks/profile.mutation";
import ConfirmModal from "../../../shared/ui/ConfirmModal";
import PasswordVisibility from "../../../shared/ui/PasswordVisibility";
import ChangeEmailModal from "../components/ChangeEmailModal";
import { Navigate } from "react-router";

function MyProfile() {
  const { user, setUser } = useAuthStore();

  const [isEdit, setIsEdit] = useState<
    null | "PERSONAL" | "EMAIL" | "PASSWORD"
  >(null);
  const [changingProfilePhoto, setChangingProfilePhoto] = useState(false);
  const [personalLoading, setPersonalLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [personalModalOpen, setPersonalModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const mutation = useUpdateProfileImage();
  const deleteMutation = useDeleteProfilePhoto();
  const changePasswordMutation = useUpdatePassword();

  const [image, setImage] = useState<ImageType | null>(null);

  const { register, handleSubmit, watch } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.fullName.split(" ")[0],
      lastName: user?.fullName.split(" ")[1],
      phoneNumber: user?.phoneNumber,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleUpdateProfile = () => {
    if (
      watch("firstName") === user?.fullName.split(" ")[0] &&
      watch("lastName") === user?.fullName.split(" ")[1] &&
      watch("phoneNumber") === user?.phoneNumber
    ) {
      toast.error("No changes to update");
      setIsEdit(null);
      return;
    }
    setPersonalModalOpen(true);
  };

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      toast.loading("Updating profile...");
      setPersonalLoading(true);
      const response = await updateMeRequest(data);

      setUser(response.data.user);
      toast.dismiss();
      toast.success("Profile updated successfully");
      setIsEdit(null);
      setPersonalModalOpen(false);
    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
    } finally {
      setPersonalLoading(false);
    }
  };

  const handleSaveProfilePhoto = () => {
    if (!image && user?.profileImage) {
      setDeleteModalOpen(true);
    } else {
      handleChangeProfilePhoto();
    }
  };

  const handleChangeProfilePhoto = () => {
    if (image?.preview === user?.profileImage) {
      toast.error("No changes to update");
      setChangingProfilePhoto(false);
      return;
    }

    if (!image?.file) {
      toast.error("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", image.file);

    const toastId = toast.loading("Uploading photo...");

    mutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile photo updated", { id: toastId });
        setChangingProfilePhoto(false);
      },
      onError: () => {
        toast.error("Upload failed", { id: toastId });
        setChangingProfilePhoto(false);
      },
    });
  };

  const handleDeleteProfilePhoto = () => {
    const toastId = toast.loading("Deleting profile photo...");

    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Profile photo deleted", { id: toastId });
        setChangingProfilePhoto(false);
        setDeleteModalOpen(false);
      },
      onError: () => {
        toast.error("Delete failed", { id: toastId });
        setDeleteModalOpen(false);
      },
    });
  };

  const handleCancelProfilePhoto = () => {
    setChangingProfilePhoto(false);
    if (user?.profileImage) {
      setImage({
        id: "existing",
        preview: user.profileImage,
      });
    } else {
      setImage(null);
    }
  };

  const handleOpenPasswordModal = () => {
    handleSubmitPassword(() => {
      setPasswordModalOpen(true);
    })();
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    const toastId = toast.loading("Updating password...");

    changePasswordMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(data.message || "Password updated successfully", {
          id: toastId,
        });
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Password update failed", {
          id: toastId,
        });
        setPasswordModalOpen(false);
      },
    });
  };

  const handleCancelPasswordEdit = () => {
    resetPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setIsEdit(null);
  };

  useEffect(() => {
    if (user?.profileImage) {
      setImage({
        id: "existing",
        preview: user.profileImage,
      });
    }
  }, [user]);

  useEffect(() => {
    if (isEdit === "EMAIL") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isEdit]);

  if (!user)
    return (
      <>
        {toast.error("You are not authorized to access this page")}
        <Navigate to="/login" replace />
      </>
    );

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="layout-container flex h-full grow flex-col">
        <main className="max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex flex-col items-center gap-2 h-40">
                    <ProfilePhoto
                      image={image}
                      onChange={setImage}
                      changingProfilePhoto={changingProfilePhoto}
                    />
                    {changingProfilePhoto ? (
                      <>
                        <button
                          onClick={handleSaveProfilePhoto}
                          disabled={
                            mutation.isPending || deleteMutation.isPending
                          }
                          type="button"
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 active:scale-[0.98] transition w-38  ${
                            mutation.isPending || deleteMutation.isPending
                              ? "opacity-50 cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                        >
                          {mutation.isPending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined"></span>
                              Save changes
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleCancelProfilePhoto}
                          type="button"
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 active:scale-[0.98] transition cursor-pointer`}
                        >
                          {" "}
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          setChangingProfilePhoto(!changingProfilePhoto)
                        }
                        type="button"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium shadow-sm hover:bg-primary/90 active:scale-[0.98] transition cursor-pointer w-38`}
                      >
                        {" "}
                        Edit Profile Photo
                      </button>
                    )}
                    <ConfirmModal
                      isLoading={deleteMutation.isPending}
                      isOpen={deleteModalOpen}
                      onConfirm={handleDeleteProfilePhoto}
                      onCancel={() => setDeleteModalOpen(false)}
                      title="Remove profile photo?"
                      description="This will remove your current profile image."
                      buttonTitle="Remove"
                    />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <h1 className="text-2xl font-bold text-slate-900">
                        {user?.fullName}
                      </h1>
                      <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">
                          verified
                        </span>
                        Verified
                      </span>
                    </div>
                    <p className="text-slate-500">{user?.email}</p>
                    <p className="text-xs text-slate-400">
                      {user.role === "TENANT"
                        ? "This account is for tenant and have full access to tenant features"
                        : "This account is for customer and have full access to customer features"}
                    </p>
                  </div>
                </div>
              </section>
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-primary/5 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 pt-3 h-12">
                    Personal Information
                  </h2>
                  {isEdit === "PERSONAL" ? (
                    <div className="flex gap-8">
                      <button
                        onClick={handleUpdateProfile}
                        className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEdit(null)}
                        className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEdit("PERSONAL")}
                      className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-500">
                      First Name
                    </label>
                    <input
                      {...register("firstName")}
                      disabled={isEdit !== "PERSONAL"}
                      className={`w-full p-3.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-500">
                      Last Name
                    </label>
                    <input
                      {...register("lastName")}
                      disabled={isEdit !== "PERSONAL"}
                      className={`w-full p-3.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      type="text"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-500">
                      Phone Number
                    </label>
                    <input
                      {...register("phoneNumber")}
                      disabled={isEdit !== "PERSONAL"}
                      className={`w-full p-3.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      type="tel"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-500">
                      Email Address
                    </label>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setIsEdit("EMAIL")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setIsEdit("EMAIL");
                        }
                      }}
                      className="relative group cursor-pointer"
                    >
                      <input
                        disabled
                        className="w-full rounded-lg p-3.5 border border-primary/10 bg-background-light text-sm text-slate-700 
               cursor-pointer transition-all group-hover:blur-[1px]"
                        type="email"
                        value={user?.email}
                      />

                      <div
                        className="absolute inset-0 rounded-lg bg-primary/70 opacity-0 
               group-hover:opacity-100 transition-all flex items-center justify-center"
                      >
                        <span className="text-white font-semibold text-sm tracking-wide">
                          Change Email
                        </span>
                      </div>
                    </div>
                  </div>
                  {isEdit === "EMAIL" && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center ">
                      <ChangeEmailModal onClose={() => setIsEdit(null)} />
                    </div>
                  )}
                </div>
                <ConfirmModal
                  isOpen={personalModalOpen}
                  onConfirm={handleSubmit(onSubmitProfile)}
                  onCancel={() => setPersonalModalOpen(false)}
                  title="Update Profile"
                  description="Are you sure you want to update your profile?"
                  isLoading={personalLoading}
                  buttonTitle="Update"
                />
              </section>
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-primary/5 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900 h-12">
                    Change Password
                  </h2>
                  {isEdit === "PASSWORD" ? (
                    <div className="flex gap-8">
                      <button
                        type="button"
                        onClick={handleOpenPasswordModal}
                        className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 cursor-pointer hover:scale-105"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPasswordEdit}
                        className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEdit("PASSWORD")}
                      className="text-primary font-semibold text-sm hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <ConfirmModal
                  isOpen={passwordModalOpen}
                  onConfirm={handleSubmitPassword(onSubmitPassword)}
                  onCancel={() => setPasswordModalOpen(false)}
                  title="Update Password"
                  description="Are you sure you want to update your password?"
                  isLoading={changePasswordMutation.isPending}
                  buttonTitle="Update"
                />
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-500">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        disabled={isEdit !== "PASSWORD"}
                        {...registerPassword("currentPassword")}
                        className={`w-full rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PASSWORD" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                        placeholder={showPassword ? "abcdefghi" : "••••••••"}
                        type={showPassword ? "text" : "password"}
                      />
                      <PasswordVisibility
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        disabled={isEdit !== "PASSWORD"}
                      />
                      {errors.currentPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-500">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          disabled={isEdit !== "PASSWORD"}
                          {...registerPassword("newPassword")}
                          className={`w-full rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PASSWORD" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                          placeholder="Min. 8 characters"
                          type={showNewPassword ? "text" : "password"}
                        />
                        <PasswordVisibility
                          showPassword={showNewPassword}
                          setShowPassword={setShowNewPassword}
                          disabled={isEdit !== "PASSWORD"}
                        />
                        {errors.newPassword && (
                          <p className="text-red-500 text-sm">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-500">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          disabled={isEdit !== "PASSWORD"}
                          {...registerPassword("confirmPassword")}
                          className={`w-full rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PASSWORD" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                          placeholder="Re-type password"
                          type={showConfirmPassword ? "text" : "password"}
                        />

                        <PasswordVisibility
                          showPassword={showConfirmPassword}
                          setShowPassword={setShowConfirmPassword}
                          disabled={isEdit !== "PASSWORD"}
                        />
                      </div>

                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyProfile;
