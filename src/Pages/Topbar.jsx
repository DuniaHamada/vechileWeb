import { useState, useEffect, useRef } from "react";
import { FiBell, FiChevronDown, FiSettings, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logoSEESERV-1.png"; 

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  
  
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();



  const mechanicData = JSON.parse(localStorage.getItem("mechanic")) || {};
  const user = {
    name: mechanicData?.name || "Mechanic",
    workshop: mechanicData?.workshopName || "Workshop",
    avatar: mechanicData?.profile_picture || "/default-avatar.jpg"
  };

  const pageTitles = {
    "/mechanic-dashboard": "Dashboard Overview",
    "/mechanic-dashboard/bookings": "Bookings Management",
    "/mechanic-dashboard/financial-reports": "Financial Reports",
    "/mechanic-dashboard/invoices": "Invoices Management",
    "/mechanic-dashboard/reviews": "Customer Reviews",
    "/mechanic-dashboard/settings": "Workshop Settings",
    "/mechanic-dashboard/settings/profile": "Workshop Profile",
    "/mechanic-dashboard/settings/services": "Service List",
    "/mechanic-dashboard/settings/work-hours": "Work Hours",
    "/mechanic-dashboard/settings/notifications": "Notification Settings",
  };

  useEffect(() => {
    const path = location.pathname;
    const title = pageTitles[path] || 
                 path.split('/').pop().replace(/-/g, ' ') || 
                 "Dashboard";
    setPageTitle(title);
    document.title = `${title} | Mechanic Panel`;
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mechanic");
    navigate("/login");
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
          </div>

          <div className="flex-1 px-6 text-center">
            <h1 className="text-2xl font-semibold text-[#086189] dark:text-[#086189]/80 truncate">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/mechanic-dashboard/notifications"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiBell className="text-[#086189] dark:text-[#086189]/80 h-6 w-6" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={isDropdownOpen}
              >
                <img
                  className="h-10 w-10 rounded-full border-2 border-[#086189]/30 dark:border-[#086189]/50 object-cover"
                  src={user.avatar}
                  alt="User profile"
                />
                <FiChevronDown className={`h-4 w-4 text-[#086189] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 dark:ring-gray-600 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-600">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{user.workshop}</div>
                    </div>
                 <Link
  to="/mechanic-dashboard/settings/profile"
  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
  onClick={() => setIsDropdownOpen(false)}
>
  <FiSettings className="mr-3 h-4 w-4" />
  Workshop Settings
</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <FiLogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;