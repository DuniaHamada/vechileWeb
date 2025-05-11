import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MechanicDashboard = () => {
  const [mechanic, setMechanic] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Try to get from location first, then fallback to localStorage
  const workshopName = location.state?.workshop_name || localStorage.getItem("workshop_name");
  const workshop_id = location.state?.workshop_id || localStorage.getItem("workshop_id");

  useEffect(() => {
    // ✅ Save to localStorage (in case this is first time login)
    if (workshopName && workshop_id) {
      localStorage.setItem("workshop_name", workshopName);
      localStorage.setItem("workshop_id", workshop_id);
    }

    setMechanic({ workshopName, workshop_id });

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://176.119.254.225:80/booking/workshop/${workshop_id}/bookings`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (workshop_id) {
      fetchBookings();
    } else {
      setError("Workshop ID is missing.");
      setLoading(false);
    }
  }, [workshopName, workshop_id]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("workshop_name");
    localStorage.removeItem("workshop_id");
    navigate("/mechanic-login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {mechanic?.workshopName}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Bookings</h2>
            <p className="text-3xl font-bold text-[#086189]">{bookings.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Bookings List</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings found.</p>
          ) : (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.booking_id} className="border-t text-gray-600">
                    <td className="px-4 py-2">{booking.booking_id}</td>
                    <td className="px-4 py-2">{booking.first_name} {booking.last_name}</td>
                    <td className="px-4 py-2">{booking.booking_date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          booking.booking_status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.booking_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;
