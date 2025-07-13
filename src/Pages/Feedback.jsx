import { useState, useEffect } from "react";
import axios from "axios";
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
  MoreVertical,
} from "lucide-react";

const FeedbackPage = () => {
  const [servicesWithReviews, setServicesWithReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchServicesWithReviews = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const response = await axios.get(
          "http://176.119.254.225:80/review/services-with-reviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('API Response:', response.data);
        console.log('API Response Type:', typeof response.data);
        console.log('API Response Length:', response.data?.length);
        if (response.data && response.data.length > 0) {
          console.log('First Service:', response.data[0]);
          console.log('Total Reviews from first service:', response.data[0].total_reviews);
          console.log('Total Reviews type:', typeof response.data[0].total_reviews);
        }
        setServicesWithReviews(response.data);
      } catch (error) {
        console.error("Error fetching services with reviews:", error);
        setError("Failed to load services with reviews");

        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesWithReviews();
  }, []);

  // Calculate stats from the API data
  const calculateStats = () => {
    if (!servicesWithReviews.length)
      return {
        totalReviews: 0,
        averageRating: 0,
        responseRate: 0,
        negativeFeedback: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };

    const totalReviews = servicesWithReviews.reduce(
      (sum, service) => {
        console.log('Service:', service.service_name, 'Total Reviews:', service.total_reviews, 'Type:', typeof service.total_reviews);
        return sum + (parseInt(service.total_reviews) || 0);
      },
      0
    );
    const totalRating = servicesWithReviews.reduce(
      (sum, service) => {
        const reviews = parseInt(service.total_reviews) || 0;
        const rating = parseFloat(service.average_rating) || 0;
        console.log('Service:', service.service_name, 'Rating:', rating, 'Reviews:', reviews, 'Contribution:', rating * reviews);
        return sum + (rating * reviews);
      },
      0
    );
    const averageRating =
      totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    // Calculate rating distribution
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    servicesWithReviews.forEach(service => {
      const reviews = parseInt(service.total_reviews) || 0;
      const rating = Math.round(parseFloat(service.average_rating) || 0);
      if (rating >= 1 && rating <= 5) {
        ratingDistribution[rating] += reviews;
      }
    });

    console.log('Final Calculation - Total Reviews:', totalReviews, 'Total Rating:', totalRating, 'Average Rating:', averageRating);
    console.log('Rating Distribution:', ratingDistribution);

    // Calculate negative feedback (1 and 2 star ratings)
    const negativeReviews = ratingDistribution[1] + ratingDistribution[2];
    const negativeFeedbackPercentage = totalReviews > 0 ? Math.round((negativeReviews / totalReviews) * 100) : 0;

    return {
      totalReviews,
      averageRating,
      responseRate: 87, // This would need to come from a different API endpoint
      negativeFeedback: negativeFeedbackPercentage,
      ratingDistribution
    };
  };

  const stats = calculateStats();
  
  // Debug: Log the calculated stats
  console.log('Calculated Stats:', stats);
  console.log('Services with Reviews:', servicesWithReviews);

  // Filter services based on search term
  const filteredServices = servicesWithReviews.filter((service) => {
    if (!searchTerm) return true;
    return service.service_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 min-h-screen ">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Reviews
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {stats.totalReviews}
                </p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +12%
              </span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Average Rating
                </p>
                <div className="mt-1 flex items-center">
                  <p className="text-2xl font-semibold text-gray-900 mr-2">
                    {stats.averageRating}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(stats.averageRating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                +0.2
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Negative Feedback
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {stats.negativeFeedback}%
                </p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                -3%
              </span>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Rating Distribution
            </h3>
            <button className="text-sm font-medium text-[#086189] hover:text-[#0a73a1]">
              View details
            </button>
          </div>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stats.ratingDistribution[stars] || 0;
              const percentage = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;
              
              return (
                <div key={stars} className="flex items-center">
                  <div className="w-10 flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-1">
                      {stars}
                    </span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 mx-3 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#086189]"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                  <div className="w-10">
                    <span className="text-sm text-gray-500">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900">
                All Customer Reviews
              </h3>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#086189] focus:border-[#086189] text-sm"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#086189] mx-auto"></div>
              <p className="mt-4 text-gray-600">
                Loading services with reviews...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No services with reviews found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <div
                  key={service.service_id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-[#086189]/10 flex items-center justify-center text-[#086189]">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {service.service_name}
                          </p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {service.total_reviews} reviews
                          </span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <span className="font-medium">₪{service.price}</span>
                          <span className="mx-1">·</span>
                          <span>
                            {service.service_description ||
                              "No description available"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < service.average_rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {service.average_rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pl-14">
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Service Details
                    </div>
                    <p className="text-sm text-gray-700">
                      {service.service_description ||
                        "No description available"}
                    </p>

                    {/* Service Actions */}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredServices.length}</span> of{" "}
              <span className="font-medium">{servicesWithReviews.length}</span>{" "}
              services
            </div>
            <div className="flex gap-1">
              <button
                className="px-3 py-1 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
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
