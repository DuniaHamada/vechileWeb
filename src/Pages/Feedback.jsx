import {
  Star,
  MessageSquare,
  User,
  Car,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Shield,
  CheckCircle,
  XCircle,
  Download,
  Plus,
  MoreVertical
} from "lucide-react";

const FeedbackPage = () => {
  // Sample feedback data
  const feedbacks = [
    {
      id: 1,
      customer: "Ahmed Mohammed",
      vehicle: "Toyota Camry 2020",
      date: "2 days ago",
      rating: 5,
      comment: "Excellent service! My car runs smoother than ever after the oil change and tune-up. The staff was very professional and completed the work faster than expected.",
      service: "Oil Change & Full Inspection",
      response: {
        admin: "Workshop Manager",
        comment: "Thank you for your kind words Ahmed! We're glad you're satisfied with our service.",
        date: "1 day ago"
      },
      likes: 12,
      dislikes: 0,
      verified: true
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      vehicle: "Nissan Altima 2019",
      date: "1 week ago",
      rating: 4,
      comment: "Good service overall, but the waiting area could be more comfortable. The mechanics did a great job on my brake repair though.",
      service: "Brake Pad Replacement",
      response: null,
      likes: 5,
      dislikes: 1,
      verified: true
    },
    {
      id: 3,
      customer: "Mohammed Ali",
      vehicle: "Hyundai Tucson 2021",
      date: "2 weeks ago",
      rating: 2,
      comment: "Not satisfied with the diagnostic service. They couldn't find the issue with my AC and still charged me full price.",
      service: "AC Diagnostic",
      response: {
        admin: "Service Manager",
        comment: "We apologize for the inconvenience Mohammed. Please contact us directly so we can make this right for you.",
        date: "2 weeks ago"
      },
      likes: 2,
      dislikes: 8,
      verified: false
    },
    {
      id: 4,
      customer: "Fatima Ahmed",
      vehicle: "Kia Sportage 2018",
      date: "3 weeks ago",
      rating: 5,
      comment: "Best workshop in town! Honest pricing and they explained everything clearly. Will definitely come back for all my car needs.",
      service: "Full Service Package",
      response: null,
      likes: 20,
      dislikes: 0,
      verified: true
    }
  ];

  // Stats data
  const stats = [
    { label: "Total Reviews", value: "142", change: "+12%", trend: "up" },
    { label: "Average Rating", value: "4.6", change: "+0.2", trend: "up" },
    { label: "Response Rate", value: "87%", change: "+5%", trend: "up" },
    { label: "Negative Feedback", value: "8%", change: "-3%", trend: "down" }
  ];

  return (
    <div className="p-6 min-h-screen ">
      <div className="max-w-7xl mx-auto">
       

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
            <button className="text-sm font-medium text-[#086189] hover:text-[#0a73a1]">
              View details
            </button>
          </div>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center">
                <div className="w-10 flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-1">{stars}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="flex-1 mx-3 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#086189]" 
                    style={{ width: `${(stars === 5 ? 68 : stars === 4 ? 22 : stars === 3 ? 6 : stars === 2 ? 3 : 1)}%` }}
                  />
                </div>
                <div className="w-10">
                  <span className="text-sm text-gray-500">
                    {stars === 5 ? '68%' : stars === 4 ? '22%' : stars === 3 ? '6%' : stars === 2 ? '3%' : '1%'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900">All Customer Reviews</h3>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#086189] focus:border-[#086189] text-sm"
                  placeholder="Search reviews..."
                />
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-[#086189]/10 flex items-center justify-center text-[#086189]">
                        <User className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {feedback.customer}
                        </p>
                        {feedback.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Car className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{feedback.vehicle}</span>
                        <span className="mx-1">·</span>
                        <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{feedback.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pl-14">
                  <div className="text-sm font-medium text-gray-500 mb-1">{feedback.service}</div>
                  <p className="text-sm text-gray-700">{feedback.comment}</p>
                  
                  {/* Feedback Actions */}
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{feedback.likes}</span>
                    </button>
                    <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      <span>{feedback.dislikes}</span>
                    </button>
                    <button className="text-sm font-medium text-[#086189] hover:text-[#0a73a1]">
                      Respond
                    </button>
                    <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Admin Response */}
                  {feedback.response && (
                    <div className="mt-4 pl-4 border-l-2 border-[#086189]/20">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-[#086189]/10 flex items-center justify-center text-[#086189]">
                            <Shield className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {feedback.response.admin}
                            <span className="ml-2 text-xs font-normal text-gray-500">{feedback.response.date}</span>
                          </p>
                          <p className="mt-1 text-sm text-gray-700">{feedback.response.comment}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
              <span className="font-medium">24</span> reviews
            </div>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;