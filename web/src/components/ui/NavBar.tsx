import { Link } from "react-router";

function NavBar() {
  return (
    <header className="">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold tracking-tight">
            StayHub
          </h2>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/host" className="">
            Become a Host
          </Link>
          <Link to="/experiences" className="">
            Experiences
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="">
              Login
            </Link>
            <Link to="/signup" className="">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
