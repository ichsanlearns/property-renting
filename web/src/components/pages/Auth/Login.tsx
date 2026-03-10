function Login() {
  return (
    <main className="flex-1 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-xl shadow-primary/5 p-8 md:p-10 border border-primary/5">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Log in to your StayHub account to manage your bookings.
          </p>
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                mail
              </span>
              <input
                className="w-full pl-12 pr-4 py-3.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                id="email"
                placeholder="name@company.com"
                type="email"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold" htmlFor="password">
                Password
              </label>
              <a
                className="text-xs font-semibold text-primary hover:underline"
                href="#"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                lock
              </span>
              <input
                className="w-full pl-12 pr-4 py-3.5 bg-background-light dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 py-1">
            <input
              className="rounded border-slate-300 text-primary focus:ring-primary"
              id="remember"
              type="checkbox"
            />
            <label
              className="text-sm text-slate-600 dark:text-slate-400"
              htmlFor="remember"
            >
              Keep me logged in
            </label>
          </div>
          <button
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-4 text-slate-500 font-semibold tracking-wider">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-background-light dark:hover:bg-slate-800 transition-colors font-medium">
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
          <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-background-light dark:hover:bg-slate-800 transition-colors font-medium">
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
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?
            <a className="text-primary font-bold hover:underline ml-1" href="#">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
