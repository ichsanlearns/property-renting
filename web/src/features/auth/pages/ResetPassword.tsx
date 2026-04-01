import { Link } from "react-router";

function ResetPassword() {
  return (
    <div className="bg-mesh min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <span className="text-2xl font-extrabold text-primary tracking-tight">
            StayHub
          </span>
        </div>
        <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-2xl shadow-slate-200/50 flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              data-icon="lock_reset"
            >
              lock_reset
            </span>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-2 leading-tight">
              Forgot your password?
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base">
              Enter your email and we’ll send you a reset link
            </p>
          </div>
          <form className="w-full space-y-6">
            <div className="space-y-2">
              <label className="block font-label text-[10px] font-bold uppercase tracking-wider text-on-surface-variant ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span
                    className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors"
                    data-icon="mail"
                  >
                    mail
                  </span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-xl text-on-surface placeholder:text-slate-400 transition-all"
                  placeholder="name@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <button
              className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
          <div className="mt-8">
            <Link
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-semibold text-sm transition-colors group"
              to="/login"
            >
              <span
                className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform"
                data-icon="arrow_back"
              >
                arrow_back
              </span>
              Back to login
            </Link>
          </div>
        </div>
        <footer className="mt-8 text-center">
          <div className="flex justify-center gap-4 mb-2">
            <a
              className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <span className="text-slate-300">•</span>
            <a
              className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-primary transition-colors"
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            © 2024 Coral Horizon Hospitality
          </p>
        </footer>
      </main>
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-tertiary-container/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}

export default ResetPassword;
