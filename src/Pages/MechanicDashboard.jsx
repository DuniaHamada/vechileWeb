import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MechanicDashboard = () => {
  const [mechanic, setMechanic] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMechanic = localStorage.getItem("mechanic");
    if (!storedMechanic) {
      navigate("/mechanic-login");
    } else {
      setMechanic(JSON.parse(storedMechanic));
      // Simulated bookings data (replace with actual API call)
      setBookings([
        { id: 1, customer: "Ahmad", date: "2024-05-10", status: "Pending" },
        { id: 2, customer: "Sara", date: "2024-05-12", status: "Approved" },
      ]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("mechanic");
    localStorage.removeItem("mechanicToken");
    navigate("/mechanic-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {mechanic?.name || "Mechanic"}
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
          {/* More stats here if needed */}
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
                  <tr key={booking.id} className="border-t text-gray-600">
                    <td className="px-4 py-2">{booking.id}</td>
                    <td className="px-4 py-2">{booking.customer}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          booking.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
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
