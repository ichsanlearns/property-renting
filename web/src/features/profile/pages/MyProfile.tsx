import { useAuthStore } from "../../auth/stores/auth.store";
import { DEFAULT_IMAGE } from "../../../shared/constants/image";
import { useState } from "react";

function MyProfile() {
  const { user } = useAuthStore();
  const [isEdit, setIsEdit] = useState<null | "PERSONAL" | "PASSWORD">(null);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="layout-container flex h-full grow flex-col">
        <main className="max-w-5xl mx-auto w-full px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="size-32 rounded-full overflow-hidden border-4 border-background-light shadow-md">
                      <img
                        alt="User Image Profile"
                        className="w-full h-full object-cover"
                        data-alt="Large profile picture of John Doe"
                        src={user?.profileImage || DEFAULT_IMAGE}
                      />
                    </div>
                    <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-sm">
                        photo_camera
                      </span>
                    </button>
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
                      Member since January 2023
                    </p>
                  </div>
                </div>
              </section>
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-primary/5 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h2>
                  {isEdit === "PERSONAL" ? (
                    <div className="flex gap-8">
                      <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEdit(null)}
                        className="text-primary font-semibold text-sm hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEdit("PERSONAL")}
                      className="text-primary font-semibold text-sm hover:underline"
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
                      disabled={isEdit !== "PERSONAL"}
                      className={`w-full p-3.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      type="text"
                      value={user?.fullName.split(" ")[0]}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-500">
                      Last Name
                    </label>
                    <input
                      disabled={isEdit !== "PERSONAL"}
                      className={`w-full p-3.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      type="text"
                      value={user?.fullName.split(" ")[1]}
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-500">
                      Email Address
                    </label>
                    <div className="flex gap-2">
                      <input
                        disabled={isEdit !== "PERSONAL"}
                        className={`flex-1 rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                        type="email"
                        value={user?.email}
                      />
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-500">
                      Phone Number
                    </label>
                    <input
                      disabled={isEdit !== "PERSONAL"}
                      className={`w-full p-3.5 rounded-lg border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PERSONAL" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      type="tel"
                      value={user?.phoneNumbers}
                    />
                  </div>
                </div>
              </section>
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-primary/5 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-slate-900">
                    Change Password
                  </h2>
                  {isEdit === "PASSWORD" ? (
                    <div className="flex gap-8">
                      <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95">
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEdit(null)}
                        className="text-primary font-semibold text-sm hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEdit("PASSWORD")}
                      className="text-primary font-semibold text-sm hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-500">
                      Current Password
                    </label>
                    <input
                      disabled={isEdit !== "PASSWORD"}
                      className={`w-full rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PASSWORD" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-500">
                        New Password
                      </label>
                      <input
                        disabled={isEdit !== "PASSWORD"}
                        className={`w-full rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PASSWORD" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                        placeholder="Min. 8 characters"
                        type="password"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-semibold text-slate-500">
                        Confirm New Password
                      </label>
                      <input
                        disabled={isEdit !== "PASSWORD"}
                        className={`w-full rounded-lg p-3.5 border border-primary/10 focus:border-primary focus:ring-primary  ${isEdit === "PASSWORD" ? "cursor-text bg-background-light/30" : "cursor-not-allowed bg-background-light"}`}
                        placeholder="Re-type password"
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section className="bg-white rounded-xl shadow-sm border border-primary/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className={` p-3 rounded-full ${user?.isVerified ? "text-green-600" : "bg-primary/10 text-red-500"}`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {user?.isVerified ? "verified_user" : "verified_off"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Account Verification
                    </h3>
                    {!user?.isVerified && (
                      <p className="text-sm text-slate-500 max-w-sm mt-1">
                        Your email is{" "}
                        <span className="text-red-600">not verified</span>. To
                        be able to book a property, please complete your email
                        verification."
                      </p>
                    )}

                    <div
                      className={`mt-3 flex items-center gap-2 text-sm font-medium ${user?.isVerified ? "text-green-600" : "text-red-500"}`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                      Email {user?.isVerified ? "verified" : "not verified"}
                    </div>
                  </div>
                </div>
                {!user?.isVerified && (
                  <div className="w-full md:w-auto flex flex-col gap-2">
                    <button className="w-full md:w-auto px-6 py-2.5 rounded-lg border border-primary text-primary font-bold hover:bg-primary/5 transition-all">
                      Resend Verification
                    </button>
                  </div>
                )}
              </section>
              <section className="p-6 border-2 border-red-50 rounded-xl bg-red-50/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-red-600">Delete Account</h3>
                    <p className="text-sm text-slate-500">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>
                  <button className="text-red-600 font-bold px-4 py-2 hover:bg-red-600 hover:text-white rounded-lg transition-all">
                    Delete My Account
                  </button>
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
