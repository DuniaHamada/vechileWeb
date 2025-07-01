import { useState, useEffect, useRef } from "react";
import { FiBell, FiChevronDown, FiSettings, FiLogOut, FiSun, FiMoon, FiMessageSquare } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logoSEESERV-1.png"; 


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedMode !== null) return savedMode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const mechanicData = JSON.parse(localStorage.getItem("mechanic"));
  const user = {
    name: mechanicData?.name || "Mechanic",
    workshop: mechanicData?.workshopName || "Workshop",
    avatar: mechanicData?.profile_picture || "/default-avatar.jpg"
  };

  const pageTitles = {
    "/": "Dashboard Overview",
    "/new-requests": "New Service Requests",
    "/in-progress": "Orders In Progress",
    "/completed": "Completed Orders",
    "/cancelled": "Cancelled Orders",
    "/schedule": "Work Schedule",
    "/financial": "Financial Reports",
    "/invoices": "Invoices Management",
    "/reviews": "Customer Reviews",
    "/messages": "Customer Messages",
    "/notifications": "Notifications",
    "/services": "Service List",
    "/settings": "Workshop Settings",
  };

  useEffect(() => {
    const title = pageTitles[location.pathname] || "Dashboard";
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
                 <div className="flex items-center space-x-3">
                   <img src={logo} alt="Company Logo" className="h-16 w-auto object-contain" />
                 </div>

          {/* Center Page Title */}
          <div className="flex-1 px-6 text-center">
            <h1 className="text-2xl font-semibold text-[#086189] dark:text-[#086189]/80 truncate">
              {pageTitle}
            </h1>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <FiSun className="text-gray-600 dark:text-yellow-300 h-6 w-6" />
              ) : (
                <FiMoon className="text-gray-600 dark:text-gray-300 h-6 w-6" />
              )}
            </button>
            
            {/* Messages */}
            <Link 
              to="/messages"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiMessageSquare className="text-[#086189] dark:text-[#086189]/80 h-6 w-6" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </Link>

            {/* Notifications */}
            <Link 
              to="/notifications"
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiBell className="text-[#086189] dark:text-[#086189]/80 h-6 w-6" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            </Link>

            {/* User Profile Dropdown */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  className="h-10 w-10 rounded-full border-2 border-[#086189]/30 dark:border-[#086189]/50 object-cover"
                  src={user.avatar}
                  alt="User profile"
                />
                <FiChevronDown className={`h-4 w-4 text-[#086189] dark:text-[#086189]/80 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 dark:ring-gray-600 focus:outline-none z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-600">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{user.workshop}</div>
                    </div>
                    
                    <button
                      onClick={toggleDarkMode}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {darkMode ? (
                        <>
                          <FiSun className="mr-3 h-4 w-4" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <FiMoon className="mr-3 h-4 w-4" />
                          Dark Mode
                        </>
                      )}
                    </button>
                    
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiSettings className="mr-3 h-4 w-4" />
                      Workshop Settings
                    </Link>
                    <Link
                      to="/logout"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiLogOut className="mr-3 h-4 w-4" />
                      Logout
                    </Link>
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