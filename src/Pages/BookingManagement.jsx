import { useState } from "react";

const initialBookings = [
  { id: 9, name: 'John Doe', date: '2025-03-31T21:00:00.000Z', status: 'Pending' },
  { id: 10, name: 'John Doee', date: '2025-04-01T21:00:00.000Z', status: 'Pending' },
  { id: 11, name: 'John Doe', date: '2025-03-27T22:00:00.000Z', status: 'Pending' },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleStatusChange = (id, newStatus) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-[#086189] mb-6 text-center">Booking Management</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-700 text-sm uppercase tracking-wide">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Customer</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="bg-gray-50 hover:shadow-md transition rounded-lg"
              >
                <td className="px-4 py-3 font-medium">{booking.id}</td>
                <td className="px-4 py-3">{booking.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(booking.date).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                      booking.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, "Accepted")}
                      disabled={booking.status !== "Pending"}
                      className={`px-4 py-1.5 text-sm rounded-lg font-medium transition ${
                        booking.status === "Pending"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, "Rejected")}
                      disabled={booking.status !== "Pending"}
                      className={`px-4 py-1.5 text-sm rounded-lg font-medium transition ${
                        booking.status === "Pending"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
