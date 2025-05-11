import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", path: "/mechanic-dashboard" },
    { label: "Workshop Profile", path: "/mechanic-dashboard/profile" },
    { label: "Services & Pricing", path: "/mechanic-dashboard/services" },
    { label: "Bookings", path: "/mechanic-dashboard/bookings" },
    { label: "Special Offers", path: "/mechanic-dashboard/offers" },
    { label: "Reports", path: "/mechanic-dashboard/reports" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg border-r border-gray-200 px-6 pt-8 text-gray-800">
      <h1 className="text-2xl font-bold text-[#086189] mb-10 text-center">Mechanic App</h1>
      
      <ul className="space-y-1">
        {navItems.map(({ label, path }, index) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive ? 'bg-[#E6F1F5] text-[#086189] font-semibold shadow-inner' : 'hover:bg-gray-100'}`
              }
            >
              {label}
            </NavLink>
            {index < navItems.length - 1 && (
              <hr className="border-t border-gray-200 my-1" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
