import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiStar,
  FiTrendingUp,
  FiTool,
  FiClock,
  FiMapPin,
  FiCheckCircle,
  FiXCircle,
  FiUsers,
  FiPackage,
  FiAlertCircle,
  FiCheck,
  FiRotateCw,
  FiRefreshCw,
  FiXCircle as FiXCircleIcon,
} from "react-icons/fi";

const WorkshopDashboard = () => {
  const [stats, setStats] = useState({
    servicesToday: 0,
    requestsToday: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    bestService: "",
    openStatus: true,
    pendingRequests: 0,
    completedServices: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date());

  // Fetch dashboard data from API
  useEffect(() => {
    fetchDashboardData();

    // Update time every minute
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://176.119.254.225:80/mechanic/mechanic/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setStats({
        servicesToday: data.servicesToday,
        requestsToday: data.requestsToday,
        monthlyRevenue: data.monthlyRevenue,
        averageRating: data.averageRating,
        bestService: data.bestService,
        openStatus: data.openStatus,
        pendingRequests: data.pendingRequests,
        completedServices: data.completedServices,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#086189]"></div>
            <span className="ml-3 text-gray-600">Loading dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <FiXCircleIcon className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading dashboard
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <p className="text-gray-600">
              {time.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 bg-[#086189] text-white rounded-lg hover:bg-[#0a73a1] transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <div
              className={`flex items-center px-4 py-2 rounded-full ${
                stats.openStatus
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {stats.openStatus ? (
                <>
                  <FiCheckCircle className="mr-2" />
                  <span>Open Now</span>
                </>
              ) : (
                <>
                  <FiXCircle className="mr-2" />
                  <span>Closed</span>
                </>
              )}
            </div>
            <div className="text-lg font-medium text-gray-700">
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Services Today */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Services Today
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.servicesToday}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <FiTool className="text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <FiTrendingUp className="mr-1 text-green-500" />
              <span>Today's bookings</span>
            </div>
          </div>

          {/* Requests Today */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Requests Today
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.requestsToday}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                <FiUsers className="text-xl" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <FiClock className="mr-1 text-yellow-500" />
              <span>{stats.pendingRequests} pending</span>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Average Rating
                </p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold mr-2">
                    {stats.averageRating}
                  </h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={
                          i < Math.floor(stats.averageRating)
                            ? "fill-current"
                            : ""
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                <FiStar className="text-xl" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Best service: {stats.bestService}
            </div>
          </div>
        </div>

        {/* Combined Working Hours and Service Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Working Hours - Modern Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg mr-3 text-indigo-600">
                    <FiClock className="text-lg" />
                  </div>
                  Working Hours
                </h2>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stats.openStatus
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {stats.openStatus ? "Open Now" : "Closed"}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { day: "Mon-Fri", hours: "8:00 AM - 6:00 PM", current: true },
                  { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="flex items-center">
                      <span
                        className={`font-medium w-20 ${
                          item.current ? "text-gray-800" : "text-gray-500"
                        }`}
                      >
                        {item.day}
                      </span>
                      {item.current && (
                        <span className="ml-2 px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full">
                          Today
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        item.current
                          ? "text-gray-800 font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center">
                  <FiMapPin className="text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    123 Workshop St, Auto City
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Service Breakdown - Modern Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3 text-blue-600">
                    <FiTool className="text-lg" />
                  </div>
                  Service Breakdown
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Completed Services */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Completed
                    </span>
                    <div className="p-1.5 bg-green-100 rounded-md text-green-600">
                      <FiCheck className="text-sm" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {stats.completedServices}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${
                          (stats.completedServices /
                            (stats.completedServices + stats.pendingRequests)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FiTrendingUp className="mr-1 text-green-500" />
                    <span>This month</span>
                  </div>
                </div>

                {/* In Progress */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      In Progress
                    </span>
                    <div className="p-1.5 bg-blue-100 rounded-md text-blue-600">
                      <FiRotateCw className="text-sm" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {Math.max(
                      0,
                      stats.servicesToday -
                        stats.completedServices -
                        stats.pendingRequests
                    )}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${
                          stats.servicesToday > 0
                            ? (Math.max(
                                0,
                                stats.servicesToday -
                                  stats.completedServices -
                                  stats.pendingRequests
                              ) /
                                stats.servicesToday) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FiAlertCircle className="mr-1 text-blue-500" />
                    <span>Today's services</span>
                  </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-500">
                      Pending
                    </span>
                    <div className="p-1.5 bg-yellow-100 rounded-md text-yellow-600">
                      <FiClock className="text-sm" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {stats.pendingRequests}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{
                        width: `${
                          (stats.pendingRequests / stats.servicesToday) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FiAlertCircle className="mr-1 text-yellow-500" />
                    <span>Needs attention</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Total Services This Month
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {stats.completedServices + stats.pendingRequests}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-xl font-bold text-gray-800">
                      {(
                        (stats.completedServices /
                          (stats.completedServices + stats.pendingRequests)) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Performing Services */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Best Performing Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800">
                  {stats.bestService}
                </h3>
                <div className="p-2 bg-green-100 rounded-lg text-green-600">
                  <FiTrendingUp />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-3">
                Most requested service this month
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">
                  {formatCurrency(249.99)}
                </span>
                <div className="flex items-center text-yellow-400">
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-gray-700">
                    {stats.averageRating}
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800">
                  Brake System Service
                </h3>
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <FiTrendingUp />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-3">
                High customer satisfaction
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">
                  {formatCurrency(179.99)}
                </span>
                <div className="flex items-center text-yellow-400">
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-gray-700">4.8</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800">Oil Change</h3>
                <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                  <FiPackage />
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-3">
                Most frequent service
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">
                  {formatCurrency(89.99)}
                </span>
                <div className="flex items-center text-yellow-400">
                  <FiStar className="fill-current" />
                  <span className="ml-1 text-gray-700">4.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
