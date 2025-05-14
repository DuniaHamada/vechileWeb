import { BarChart3, CheckCircle, Clock, DollarSign } from "lucide-react";

const Reports = () => {
  const reportData = [
    { label: "Total Bookings", value: 125, icon: <BarChart3 className="text-blue-500 w-6 h-6" /> },
    { label: "Completed Services", value: 97, icon: <CheckCircle className="text-green-500 w-6 h-6" /> },
    { label: "Pending Services", value: 28, icon: <Clock className="text-yellow-500 w-6 h-6" /> },
    { label: "Revenue", value: "$5,230", icon: <DollarSign className="text-purple-500 w-6 h-6" /> },
  ];

  const recentActivities = [
    { id: 1, activity: "Booking #1234 completed", date: "2025-05-09" },
    { id: 2, activity: "Booking #1235 cancelled", date: "2025-05-10" },
    { id: 3, activity: "New booking from Ahmad", date: "2025-05-11" },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-8 text-[#086189] "> Workshop Reports</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {reportData.map((report, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-700 text-lg font-medium">{report.label}</div>
                {report.icon}
              </div>
              <div className="text-3xl font-bold text-[#086189] mt-4">{report.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-2xl font-semibold mb-4 text-[#086189] "> Recent Activity</h3>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="py-4 flex justify-between items-center">
                <span className="text-gray-700">{activity.activity}</span>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
