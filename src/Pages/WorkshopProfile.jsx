import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiEye, FiEyeOff, FiClock } from "react-icons/fi";

export default function WorkshopProfile() {
  const [formData, setFormData] = useState({
    name: "Ahmad Workshop",
    email: "ahmad@workshop.com",
    phone: "+970 59 123 4567",
    location: "Ramallah",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    workingHours: {
      Monday: { from: "09:00", to: "17:00", available: true },
      Tuesday: { from: "09:00", to: "17:00", available: true },
      Wednesday: { from: "09:00", to: "17:00", available: true },
      Thursday: { from: "09:00", to: "17:00", available: true },
      Friday: { from: "09:00", to: "17:00", available: true },
      Saturday: { from: "", to: "", available: false },
      Sunday: { from: "", to: "", available: false },
    },
  });

  const [showSchedule, setShowSchedule] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHourChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day], [field]: value }
      }
    }));
  };

  const handleAvailabilityChange = (day) => {
    setFormData(prev => {
      const isNowAvailable = !prev.workingHours[day].available;
      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          [day]: {
            from: isNowAvailable ? "09:00" : "",
            to: isNowAvailable ? "17:00" : "",
            available: isNowAvailable
          }
        }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Workshop Info:", formData);
    // Add your form submission logic here
  };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white  shadow-m">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Workshop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] focus:border-[#086189] transition"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Password Settings</h3>
            <button
              type="button"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="text-sm text-[#086189] hover:text-[#086189]/80"
            >
              {showPasswordFields ? "Hide" : "Change Password"}
            </button>
          </div>
          
          {showPasswordFields && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#086189] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      
        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#086189] text-white font-medium rounded-lg hover:bg-[#064a6e] transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}