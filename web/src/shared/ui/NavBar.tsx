import { Link } from "react-router";
import { useAuthStore } from "../../features/auth/stores/auth.store";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
import { logoutRequest } from "../../features/auth/api/auth.service";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      toast.loading("Logging out...");
      await logoutRequest();

      logout();
      toast.dismiss();
      toast.success("Logged out successfully");
      setIsMenuOpen(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to log out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleStarted = () => {
    if (!user) {
      toast.error("Please login to get started");
      navigate("/login");
    }

    setIsMenuOpen(false);
  };

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 md:px-20 py-1">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary">
          <img src="/favicon.ico" alt="logo" className="w-8 h-8" />
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold tracking-tight">
            SewaHunian
          </h2>
        </Link>
        <div className="flex gap-5">
          <div className="flex justify-end items-center gap-8">
            {(!user || user.role === "CUSTOMER") && (
              <>
                <Link
                  to="/mybooking"
                  className="text-sm hidden md:block font-semibold hover:text-primary transition-colors"
                >
                  My Booking
                </Link>
              </>
            )}
            {(!user || user.role === "TENANT") && (
              <>
                <Link
                  to="/tenant/properties"
                  className="text-sm hidden md:block font-semibold hover:text-primary transition-colors"
                >
                  Become a Host
                </Link>
                {/* <Link
                  to="/experiences"
                  className="text-sm hidden md:block font-semibold hover:text-primary transition-colors"
                >
                  Experiences
                </Link> */}
              </>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/myprofile"
                  className="flex items-center gap-3 bg-primary/20 hover:bg-primary/40 px-3 py-2 rounded-xl transition"
                >
                  <img
                    src={
                      user.profileImage ||
                      `https://ui-avatars.com/api/?name=${user.fullName}`
                    }
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover border border-white/30"
                  />

                  <span className="text-black/80 font-semibold text-sm">
                    {user.fullName}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="hidden md:flex p-2 text-black/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="h-6 w-px hidden md:block bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="text-sm font-bold px-4 hidden md:block py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/25 hover:scale-105 transition-transform"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 w-screen h-screen z-40 bg-black/40 backdrop-blur-sm ${isMenuOpen ? "block" : "hidden"}`}
      ></div>

      <div
        ref={sidebarRef}
        className={`fixed right-0 md:hidden top-0  h-screen w-[80%]  z-50 bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/favicon.ico" alt="logo" className="w-8 h-8" />
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              SewaHunian
            </span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-1 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {user && (
          <Link
            to="/profile"
            className="px-6 py-4 flex items-center gap-4 mb-2"
          >
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                data-alt="User profile avatar portrait"
                src={
                  user?.profileImage ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHbaB86c20n3U1b4BK2sAhT7k4A4exkiL3tABqErsPOt1Oqx3N3InV3MYMi2R1uJ3kq52A2B5lDudrTbmAs4-g7bSezLjOAJAkehIo7Rd4_eNYRYmxXBXa66bUEIhSD4xDdRgSKdLOSALI66I5isLndzAG1oE-pkWo8JboGRSzaRL9NloEq-zdY0yNqvFALxTl3EjOqNIrauhbqZ3VkyMsFHv1NADfWkMrlFPS3KRI8iIySGkhjyn_R8T1_yAtUh7ay_JoRbAnnWfL"
                }
              />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-slate-100">
                {user?.fullName}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
          </Link>
        )}

        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 mb-8">
            <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Discover
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/5 group"
                  href="#"
                >
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                    explore
                  </span>
                  <span className="text-base font-semibold">Explore Stays</span>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/5 group"
                  href="#"
                >
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                    travel_explore
                  </span>
                  <span className="text-base font-semibold">
                    Popular Destinations
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div className="px-8 mb-8">
            <hr className="border-slate-100 dark:border-slate-800" />
          </div>

          {user && (
            <>
              <div className="px-3 pb-4">
                <p className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  My Activity
                </p>
                {user?.role === "CUSTOMER" && (
                  <ul className="space-y-1">
                    <li>
                      <a
                        className="flex items-center gap-4 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        href="#"
                      >
                        <span className="material-symbols-outlined text-[22px]">
                          calendar_month
                        </span>
                        <span>My Bookings</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-4 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        href="#"
                      >
                        <span className="material-symbols-outlined text-[22px]">
                          favorite
                        </span>
                        <span>Wishlist</span>
                      </a>
                    </li>
                  </ul>
                )}
                {user?.role === "TENANT" && (
                  <Link
                    to="/tenant/properties"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/5 group"
                  >
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                      real_estate_agent
                    </span>
                    <span className="text-base font-semibold">
                      Become a Host
                    </span>
                  </Link>
                )}
              </div>

              <div className="px-8 mb-8">
                <hr className="border-slate-100 dark:border-slate-800" />
              </div>
            </>
          )}

          <div className="px-4 mb-8">
            <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account
            </h3>
            <ul className="space-y-1">
              {user ? (
                <>
                  <li>
                    <button
                      className={`flex w-full items-center gap-4 px-3 py-3 rounded-lg text-primary font-medium hover:bg-primary/5 transition-colors cursor-pointer ${isLoggingOut ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        logout
                      </span>
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                      <svg
                        className={`animate-spin h-5 w-5 text-white ${isLoggingOut ? "" : "hidden"}`}
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
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/5 group"
                    >
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                        person_add
                      </span>
                      <span className="text-base font-semibold">Sign Up</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/5 group"
                    >
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                        login
                      </span>
                      <span className="text-base font-semibold">Login</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center gap-4 px-4 py-4 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-primary/5 group"
                    >
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">
                        real_estate_agent
                      </span>
                      <span className="text-base font-semibold">
                        Become a Host
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={() => handleStarted()}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
          <p className="mt-4 text-center text-xs text-slate-400 leading-relaxed">
            Log in or sign up to save your favorite stays and book your next
            trip.
          </p>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
