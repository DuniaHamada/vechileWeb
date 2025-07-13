import { useState, useEffect } from "react";
import {
  BarChart3,
  DollarSign,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Calendar,
  Download,
  MoreHorizontal,
  RefreshCw,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions from API
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://176.119.254.225:80/mechanic/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate financial metrics from real data
  const calculateMetrics = () => {
    let totalRevenue = 0;
    let workshopEarnings = 0;
    let adminCommission = 0;
    let totalRefunds = 0;

    transactions.forEach((tx) => {
      // Handle amounts that may or may not have currency symbols
      const amountStr = tx?.amount?.toString() || "0";
      const refundStr = tx?.refund?.toString() || "0";

      // Remove any currency symbols and parse as number
      const amount = parseFloat(amountStr.replace(/[₪$,\s]/g, "")) || 0;
      const refundAmount = parseFloat(refundStr.replace(/[₪$,\s]/g, "")) || 0;

      totalRevenue += amount;
      workshopEarnings += amount * 0.85; // 85% to workshop
      adminCommission += amount * 0.15; // 15% to admin
      totalRefunds += refundAmount;
    });

    return {
      totalRevenue,
      workshopEarnings,
      adminCommission,
      totalRefunds,
    };
  };

  const metrics = calculateMetrics();

  const stats = [
    {
      title: "Total Revenue",
      value: `₪${metrics.totalRevenue.toFixed(2)}`,
      change: "+12.5%",
      icon: <DollarSign className="text-violet-600 w-5 h-5" />,
    },
    {
      title: "Workshop Earnings",
      value: `₪${metrics.workshopEarnings.toFixed(2)}`,
      change: "+8.2%",
      icon: <DollarSign className="text-green-600 w-5 h-5" />,
    },
    {
      title: "Admin Commission",
      value: `₪${metrics.adminCommission.toFixed(2)}`,
      change: "+15.3%",
      icon: <DollarSign className="text-blue-600 w-5 h-5" />,
    },
  ];

  // Calculate service distribution from real data
  const calculateServiceDistribution = () => {
    const serviceCounts = {};
    transactions.forEach((tx) => {
      if (tx.services && Array.isArray(tx.services)) {
        tx.services.forEach((service) => {
          serviceCounts[service] = (serviceCounts[service] || 0) + 1;
        });
      }
    });

    const totalServices = Object.values(serviceCounts).reduce(
      (sum, count) => sum + count,
      0
    );

    // If no real data, provide sample data
    if (totalServices === 0) {
      return [
        { name: "Oil Change", value: 35 },
        { name: "Brake Service", value: 25 },
        { name: "Engine Repair", value: 20 },
        { name: "Tire Replacement", value: 15 },
        { name: "Other Services", value: 5 },
      ];
    }

    return Object.entries(serviceCounts).map(([service, count]) => ({
      name: service,
      value: Math.round((count / totalServices) * 100),
    }));
  };

  const serviceData = calculateServiceDistribution();

  // Generate monthly revenue data from transactions
  const generateMonthlyRevenueData = () => {
    const monthlyData = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const month = date.toLocaleString("en-US", { month: "short" });
      const amountStr = tx?.amount?.toString() || "0";
      const amount = parseFloat(amountStr.replace(/[₪$,\s]/g, "")) || 0;

      if (!monthlyData[month]) {
        monthlyData[month] = { revenue: 0, earnings: 0 };
      }

      monthlyData[month].revenue += amount;
      monthlyData[month].earnings += amount * 0.85; // 85% goes to workshop
    });

    // If no real data, provide sample data
    if (Object.keys(monthlyData).length === 0) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      return months.map((month, index) => ({
        name: month,
        revenue: 12000 + index * 2000 + Math.random() * 3000,
        earnings: (12000 + index * 2000 + Math.random() * 3000) * 0.85,
      }));
    }

    return Object.entries(monthlyData).map(([month, data]) => ({
      name: month,
      revenue: data.revenue,
      earnings: data.earnings,
    }));
  };

  const revenueData = generateMonthlyRevenueData();

  // Status colors
  const statusColors = {
    completed: "bg-emerald-100 text-emerald-800",
    refunded: "bg-rose-100 text-rose-800",
    pending: "bg-amber-100 text-amber-800",
  };

  const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F97316", "#10B981"];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#086189]"></div>
            <span className="ml-3 text-gray-600">Loading reports...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading reports
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Financial Reports
            </h1>
            <p className="text-gray-600">
              Overview of your workshop's financial performance
            </p>
          </div>
          <button
            onClick={fetchTransactions}
            className="flex items-center gap-2 px-4 py-2 bg-[#086189] text-white rounded-lg hover:bg-[#0a73a1] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-500 text-sm font-medium">
                  {stat.title}
                </div>
                <div
                  className={`p-2 rounded-lg ${
                    stat.change.includes("+") ? "bg-emerald-50" : "bg-rose-50"
                  }`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div
                    className={`flex items-center mt-2 text-xs ${
                      stat.change.includes("+")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {stat.change.includes("+") ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {stat.change} vs last period
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue Trend
              </h3>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                  Revenue
                </button>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                  Earnings
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Service Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Service Distribution
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={serviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {serviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ paddingLeft: "20px" }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View all
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.slice(0, 5).map((transaction) => (
                  <tr
                    key={transaction.paymentId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {transaction.customer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : transaction.paymentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
