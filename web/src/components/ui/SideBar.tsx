import { Link, NavLink } from "react-router";
import { useAuthStore } from "../../stores/auth.store";

function SideBar() {
  const { user } = useAuthStore();

  const roleLabel = user?.role === "TENANT" ? "tenant" : user?.role === "CUSTOMER" ? "Customer" : "";
  const menu = [
    {
      label: "Dashboard",
      path: "/tenant/dashboard",
      icon: "dashboard",
      role: ["EVENT_ORGANIZER", "CUSTOMER"],
    },
    {
      label: "Properties",
      path: "/tenant/properties",
      icon: "corporate_fare",
      role: "CUSTOMER",
    },
    {
      label: "Rooms",
      path: "/tenant/rooms",
      icon: "bed",
      role: "EVENT_ORGANIZER",
    },
    {
      label: "Orders",
      path: "/tenant/orderlist",
      icon: "receipt_long",
      role: "EVENT_ORGANIZER",
    },
    {
      label: "Reviews",
      path: "/tenant/review",
      icon: "star",
      role: "EVENT_ORGANIZER",
    },
    {
      label: "Reports",
      path: "/tenant/reports",
      icon: "monitoring",
      role: "EVENT_ORGANIZER",
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen">
      <Link to={"/"} className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-2xl">apartment</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">StayHub</h1>
          <p className="text-xs text-slate-500 font-medium">Property Admin</p>
        </div>
      </Link>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menu.map((item) => {
          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/tenant"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg
        ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"}`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}

        {/* <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>

        <a
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white shadow-lg shadow-primary/20"
          href="#"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-sm font-medium">Orders</span>
        </a> */}
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <div
            className="size-10 rounded-full bg-slate-200 bg-cover bg-center"
            data-alt="Avatar of the current user admin"
            style={{
              backgroundImage: `url(${user?.profileImage || `https://ui-avatars.com/api/?name=${user?.fullName}`})`,
            }}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">{user?.fullName}</p>
            <p className="text-[10px] text-slate-500 truncate">{roleLabel}</p>
          </div>
          <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">settings</button>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
