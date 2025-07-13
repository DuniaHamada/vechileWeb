import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiTool,
  FiDollarSign,
  FiCheck,
  FiX,
  FiEdit,
  FiSearch,
  FiFilter,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingsManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();
  const [allBookings, setAllBookings] = useState([]);
  const [todayBookings, setTodayBookings] = useState([]);
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken"); // افتراضاً التوكين مخزن هون
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get(
          "http://176.119.254.225:80/booking/Mechanic/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);

        // إذا التوكين منتهي أو غير صالح
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchTodayBookings = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get(
          "http://176.119.254.225:80/booking/Mechanic/bookings/today",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTodayBookings(response.data.bookings); // You can use setTodayBookings if you separate them
      } catch (error) {
        console.error("Error fetching today's bookings:", error);

        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          // Optional: redirect to login page here
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayBookings();
  }, []);
  useEffect(() => {
    const fetchPendingBookings = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get(
          "http://176.119.254.225:80/booking/Mechanic/bookings/pending",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPendingBookings(response.data.bookings); // You can use a separate state like setPendingBookings
      } catch (error) {
        console.error("Error fetching pending bookings:", error);

        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          // Optionally redirect to login
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingBookings();
  }, []);
  // Get the appropriate bookings based on active tab
  const getCurrentBookings = () => {
    switch (activeTab) {
      case "pending":
        return pendingBookings;
      case "today":
        return todayBookings;
      case "all":
        return allBookings;
      default:
        return [];
    }
  };

  // Filter bookings based on search term
  const filteredBookings = getCurrentBookings().filter((booking) => {
    // Filter by search term
    if (
      searchTerm &&
      !`${booking.first_name} ${booking.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      !`${booking.make} ${booking.model}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      !booking.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !booking.workshop_name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    // Update the appropriate state based on active tab
    const updateBookings = (bookingsArray, setBookingsArray) => {
      setBookingsArray(
        bookingsArray.map((booking) =>
          booking.booking_id === bookingId
            ? { ...booking, booking_status: newStatus }
            : booking
        )
      );
    };

    // Update all relevant state arrays
    updateBookings(allBookings, setAllBookings);
    updateBookings(todayBookings, setTodayBookings);
    updateBookings(pendingBookings, setPendingBookings);

    // In a real app, you would also update the backend here
  };

  const handleEditSubmit = () => {
    // Update the appropriate state based on active tab
    const updateBookings = (bookingsArray, setBookingsArray) => {
      setBookingsArray(
        bookingsArray.map((booking) =>
          booking.booking_id === selectedBooking.booking_id
            ? { ...booking, ...editData }
            : booking
        )
      );
    };

    // Update all relevant state arrays
    updateBookings(allBookings, setAllBookings);
    updateBookings(todayBookings, setTodayBookings);
    updateBookings(pendingBookings, setPendingBookings);

    setIsEditing(false);
    // In a real app, you would also update the backend here
  };

  const statusBadge = (status) => {
    const classes = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const text = {
      pending: "Pending",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${classes[status]}`}
      >
        {text[status]}
      </span>
    );
  };

  const paymentBadge = (status) => {
    const classes = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      refunded: "bg-purple-100 text-purple-800",
    };

    const text = {
      paid: "Paid",
      pending: "Pending",
      refunded: "Refunded",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${classes[status]}`}
      >
        {text[status]}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === "pending"
                ? "border-[#086189] text-[#086189]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FiAlertCircle className="mr-2" />
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab("today")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === "today"
                ? "border-[#086189] text-[#086189]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FiCalendar className="mr-2" />
            Today's Schedule
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === "all"
                ? "border-[#086189] text-[#086189]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            <FiCheckCircle className="mr-2" />
            All Bookings
          </button>
        </nav>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#086189] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#086189] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600">
              {activeTab === "pending"
                ? "No pending requests"
                : activeTab === "today"
                ? "No bookings scheduled for today"
                : "No bookings found"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle & Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workshop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-[#086189]/10 rounded-full flex items-center justify-center text-[#086189]">
                          <FiUser size={18} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.first_name} {booking.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.phone_number}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {booking.make} {booking.model} ({booking.year})
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.service_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FiCalendar className="mr-1 text-gray-400" size={14} />
                        <span className="text-sm text-gray-900 mr-3">
                          {new Date(
                            booking.scheduled_date
                          ).toLocaleDateString()}
                        </span>
                        <FiClock className="mr-1 text-gray-400" size={14} />
                        <span className="text-sm text-gray-900">
                          {booking.scheduled_time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {statusBadge(booking.booking_status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {booking.workshop_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₪{booking.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {booking.booking_status === "pending" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(
                                booking.booking_id,
                                "confirmed"
                              );
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                            title="Confirm booking"
                          >
                            <FiCheck size={18} />
                          </button>
                        )}
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking);
                            setEditData({
                              scheduled_date: booking.scheduled_date,
                              scheduled_time: booking.scheduled_time,
                            });
                            setIsEditing(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="Edit booking"
                        >
                          <FiEdit size={18} />
                        </button> */}
                        {booking.booking_status !== "cancelled" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(
                                booking.booking_id,
                                "cancelled"
                              );
                            }}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                            title="Cancel booking"
                          >
                            <FiX size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Details/Edit Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditing ? "Edit Booking" : "Booking Details"}
                </h2>
                <button
                  onClick={() => {
                    setSelectedBooking(null);
                    setIsEditing(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              {isEditing ? (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#086189]"
                        value={
                          editData.scheduled_date
                            ? new Date(editData.scheduled_date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            scheduled_date: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#086189]"
                        value={editData.scheduled_time}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            scheduled_time: e.target.value,
                          })
                        }
                      >
                        {[
                          "8:00 AM",
                          "9:00 AM",
                          "10:00 AM",
                          "11:00 AM",
                          "12:00 PM",
                          "1:00 PM",
                          "2:00 PM",
                          "3:00 PM",
                          "4:00 PM",
                          "5:00 PM",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      className="px-4 py-2 bg-[#086189] text-white rounded-md hover:bg-[#086189]/90"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiUser className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          {selectedBooking.first_name}{" "}
                          {selectedBooking.last_name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          {selectedBooking.phone_number}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Service Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiTool className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          {selectedBooking.service_name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-500 mr-2" />
                        <span className="text-gray-700">
                          {new Date(
                            selectedBooking.scheduled_date
                          ).toLocaleDateString()}{" "}
                          at {selectedBooking.scheduled_time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Vehicle Information
                    </h3>
                    <div className="space-y-3">
                      <div className="text-gray-700">
                        {selectedBooking.make} {selectedBooking.model} (
                        {selectedBooking.year})
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Payment Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Workshop:</span>
                        <span className="font-medium">
                          {selectedBooking.workshop_name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Amount:</span>
                        <span className="font-medium">
                          ₪{selectedBooking.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Notes
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-gray-700">
                        {selectedBooking.notes || "No notes available"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isEditing && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setEditData({
                        scheduled_date: selectedBooking.scheduled_date,
                        scheduled_time: selectedBooking.scheduled_time,
                      });
                      setIsEditing(true);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Edit Date/Time
                  </button>
                  {selectedBooking.booking_status === "pending" && (
                    <button
                      onClick={() => {
                        handleStatusChange(
                          selectedBooking.booking_id,
                          "confirmed"
                        );
                        setSelectedBooking(null);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Confirm Booking
                    </button>
                  )}
                  {selectedBooking.booking_status !== "cancelled" && (
                    <button
                      onClick={() => {
                        handleStatusChange(
                          selectedBooking.booking_id,
                          "cancelled"
                        );
                        setSelectedBooking(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsManagement;
