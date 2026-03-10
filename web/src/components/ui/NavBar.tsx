import { Link } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

function NavBar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 md:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-3xl font-bold">houseboat</span>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold tracking-tight">StayHub</h2>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {(!user || user.role === "CUSTOMER") && (
            <>
              <Link to="/mybooking" className="text-sm font-semibold hover:text-primary transition-colors">
                My Booking
              </Link>
            </>
          )}
          {(!user || user.role === "TENANT") && (
            <>
              <Link to="/tenant/orderlist" className="text-sm font-semibold hover:text-primary transition-colors">
                Become a Host
              </Link>
              <Link to="/experiences" className="text-sm font-semibold hover:text-primary transition-colors">
                Experiences
              </Link>
            </>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-3 bg-red-500/20 hover:bg-red-500/40 px-3 py-2 rounded-xl transition">
                <img src={user.profileImage || `https://ui-avatars.com/api/?name=${user.fullName}`} alt="avatar" className="w-9 h-9 rounded-full object-cover border border-white/30" />

                <span className="text-black/80 font-semibold text-sm hidden sm:block">{user.fullName}</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  toast.success("Berhasil logout");
                }}
                className="hidden sm:flex p-2 text-black/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                  Sign Up
                </Link>
              </div>
            </>
          )}
        </div>
        <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}

export default NavBar;
