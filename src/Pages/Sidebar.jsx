import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome as Home,
  FiUsers as Users,
  FiSettings as Settings,
  FiCalendar as Calendar,
  FiDollarSign as DollarSign,
  FiFileText as FileText,
  FiStar as Star,
  FiTool as Tool,
  FiCheckCircle as CheckCircle,
  FiXCircle as XCircle,
  FiClock as Clock,
  FiTag as Tag,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mechanicData = JSON.parse(localStorage.getItem("mechanic"));

  // Menu icons mapping
  const menuIcons = {
    Dashboard: <Home size={18} />,
    "Bookings Management": <Calendar size={18} />,
    "Financial Reports": <DollarSign size={18} />,
    "Feedback & Reviews": <Star size={18} />,
    Settings: <Settings size={18} />,
    Invoices: <FileText size={18} />,
    "Work Hours": <Clock size={18} />,
    Services: <Tag size={18} />,
  };

  // Main menu items
  const mainMenus = [
    { path: "/mechanic-dashboard", label: "Dashboard" },
    { path: "/mechanic-dashboard/bookings", label: "Bookings Management" },
    {
      path: "/mechanic-dashboard/financial-reports",
      label: "Financial Reports",
    },
    // { path: "/mechanic-dashboard/invoices", label: "Invoices" },
    { path: "/mechanic-dashboard/reviews", label: "Feedback & Reviews" },
  ];

  // Settings menu items
  const settingsMenus = [
    { path: "/mechanic-dashboard/settings/services", label: "Services" },
    { path: "/mechanic-dashboard/settings/work-hours", label: "Work Hours" },
  ];

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-white text-gray-800 h-full min-h-screen p-4 fixed top-0 left-0 z-40 shadow-lg pt-24 overflow-y-auto border-r border-gray-200">
      {/* Main Navigation */}
      <ul className="space-y-1 ">
        {mainMenus.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-md transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-[#086189] text-white shadow-md"
                  : "hover:bg-[#086189]/10 hover:text-[#086189]"
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="mr-3">
                {menuIcons[item.label] || <Home size={18} />}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="space-y-1">
        {settingsMenus.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-md transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-[#086189] text-white shadow-md"
                  : "hover:bg-[#086189]/10 hover:text-[#086189]"
              }`}
            >
              <span className="mr-3">
                {menuIcons[item.label] || <Settings size={18} />}
              </span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
