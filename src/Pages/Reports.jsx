import { 
  BarChart3,  
  DollarSign, 
  ArrowUp, 
  ArrowDown,
  TrendingUp,
  Calendar,
  Download,
  MoreHorizontal
} from "lucide-react";
import { LineChart, PieChart as RechartsPieChart, Pie, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  // Financial metrics data
  const financialData = [
    { 
      label: "Total Revenue", 
      value: "$15,230", 
      change: "+18%", 
      icon: <DollarSign className="text-violet-600 w-5 h-5" />,
      trend: "up"
    },
    { 
      label: "Workshop Earnings", 
      value: "$12,184", 
      change: "+15%", 
      icon: <TrendingUp className="text-emerald-600 w-5 h-5" />,
      trend: "up"
    },
    { 
      label: "Admin Commission", 
      value: "$3,046", 
      change: "+22%", 
      icon: <BarChart3 className="text-indigo-600 w-5 h-5" />,
      trend: "up"
    },
    { 
      label: "Refunded Amount", 
      value: "$420", 
      change: "-5%", 
      icon: <ArrowDown className="text-rose-600 w-5 h-5" />,
      trend: "down"
    },
  ];

  // Recent transactions
  const transactions = [
    { 
      id: 1, 
      description: "Payment for Oil Change #1234", 
      date: "Today, 10:45 AM", 
      amount: "$120", 
      status: "completed",
      customer: "Ahmad Ali"
    },
    { 
      id: 2, 
      description: "Refund for Tire Service #1231", 
      date: "Yesterday, 2:30 PM", 
      amount: "$85", 
      status: "refunded",
      customer: "Mohammed Salem"
    },
    { 
      id: 3, 
      description: "Payment for Full Inspection #1235", 
      date: "May 12, 9:15 AM", 
      amount: "$210", 
      status: "completed",
      customer: "Sarah Johnson"
    },
    { 
      id: 4, 
      description: "Pending Payment for Brakes #1236", 
      date: "May 11, 4:20 PM", 
      amount: "$175", 
      status: "pending",
      customer: "David Wilson"
    },
  ];

  // Status colors
  const statusColors = {
    completed: "bg-emerald-100 text-emerald-800",
    refunded: "bg-rose-100 text-rose-800",
    pending: "bg-amber-100 text-amber-800"
  };

  // Chart data
  const revenueData = [
    { name: 'Jan', revenue: 4000, earnings: 3200 },
    { name: 'Feb', revenue: 3000, earnings: 2400 },
    { name: 'Mar', revenue: 5000, earnings: 4000 },
    { name: 'Apr', revenue: 2780, earnings: 2224 },
    { name: 'May', revenue: 8890, earnings: 7112 },
    { name: 'Jun', revenue: 7390, earnings: 5912 },
  ];

  const serviceData = [
    { name: 'Oil Change', value: 35 },
    { name: 'Tire Service', value: 25 },
    { name: 'Brakes', value: 20 },
    { name: 'Diagnostics', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F97316', '#10B981'];

  return (
    <div className="p-6 min-h-screen ">
      <div className="max-w-7xl mx-auto">
      
        {/* Financial Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {financialData.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-500 text-sm font-medium">{metric.label}</div>
                <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className={`flex items-center mt-2 text-xs ${metric.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {metric.trend === 'up' ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change} vs last period
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
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <div className="flex items-center gap-2">
                <button className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full">Revenue</button>
                <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Earnings</button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
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
              <h3 className="text-lg font-semibold text-gray-900">Service Distribution</h3>
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{ paddingLeft: '20px' }}
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
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                View all
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{transaction.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{transaction.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[transaction.status]}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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