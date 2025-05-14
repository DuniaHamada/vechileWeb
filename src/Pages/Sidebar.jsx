import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/mechanic-dashboard" },
    { label: "Workshop Profile", path: "/mechanic-dashboard/profile" },
    { label: "Services & Pricing", path: "/mechanic-dashboard/services" },
    { label: "Bookings", path: "/mechanic-dashboard/bookings" },
    { label: "Special Offers", path: "/mechanic-dashboard/offers" },
    { label: "Reports", path: "/mechanic-dashboard/reports" },
  ];

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to the mechanic login page
    navigate("/mechanic-login");
  };

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg border-r border-gray-200 px-6 pt-24 text-gray-800">
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

        {/* Divider before settings & logout */}
        <hr className="border-t border-gray-200 my-1" />

        {/* Logout */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
