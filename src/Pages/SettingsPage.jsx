// SettingsPage.jsx
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSettings, FiTag, FiClock, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop());
  const [mechanic, setMechanic] = useState(JSON.parse(localStorage.getItem("mechanic")) || {});
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: mechanic?.name || "",
      email: mechanic?.email || "",
      phone: mechanic?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setActiveTab(location.pathname.split('/').pop());
  }, [location]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key]) formData.append(key, data[key]);
      });

      const response = await axios.put(
        `/api/mechanics/${mechanic._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("mechanic", JSON.stringify(response.data));
      setMechanic(response.data);
      toast.success("Profile updated successfully!");
      setShowPasswordFields(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            to="/mechanic-dashboard"
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiArrowLeft className="text-[#086189] dark:text-[#086189]/80" />
          </Link>
          <h1 className="text-2xl font-bold text-[#086189] dark:text-white">
            Workshop Settings
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-fit">
            <nav className="space-y-1">
              <Link
                to="/mechanic-dashboard/settings/profile"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-[#086189] text-white'
                    : 'hover:bg-[#086189]/10 hover:text-[#086189] dark:hover:bg-gray-700'
                }`}
              >
                <FiUser className="mr-3" />
                Profile
              </Link>
              <Link
                to="/mechanic-dashboard/settings/services"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'services'
                    ? 'bg-[#086189] text-white'
                    : 'hover:bg-[#086189]/10 hover:text-[#086189] dark:hover:bg-gray-700'
                }`}
              >
                <FiTag className="mr-3" />
                Services
              </Link>
              <Link
                to="/mechanic-dashboard/settings/work-hours"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === 'work-hours'
                    ? 'bg-[#086189] text-white'
                    : 'hover:bg-[#086189]/10 hover:text-[#086189] dark:hover:bg-gray-700'
                }`}
              >
                <FiClock className="mr-3" />
                Work Hours
              </Link>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {activeTab === 'profile' ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#086189] focus:border-[#086189] dark:bg-gray-700 dark:text-white"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#086189] focus:border-[#086189] dark:bg-gray-700 dark:text-white"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        pattern: {
                          value: /^[0-9+\- ]+$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#086189] focus:border-[#086189] dark:bg-gray-700 dark:text-white"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Password Settings
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      className="text-sm text-[#086189] hover:text-[#086189]/80 dark:text-[#086189]/80 dark:hover:text-[#086189]/60"
                    >
                      {showPasswordFields ? "Hide" : "Change Password"}
                    </button>
                  </div>

                  {showPasswordFields && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          {...register("currentPassword", {
                            required: showPasswordFields ? "Current password is required" : false,
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#086189] focus:border-[#086189] dark:bg-gray-600 dark:text-white"
                        />
                        {errors.currentPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.currentPassword.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          {...register("newPassword", {
                            required: showPasswordFields ? "New password is required" : false,
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#086189] focus:border-[#086189] dark:bg-gray-600 dark:text-white"
                        />
                        {errors.newPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.newPassword.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          {...register("confirmPassword", {
                            validate: (value) =>
                              value === watch("newPassword") || "Passwords do not match",
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#086189] focus:border-[#086189] dark:bg-gray-600 dark:text-white"
                        />
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.confirmPassword.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#086189] text-white rounded-md hover:bg-[#086189]/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;