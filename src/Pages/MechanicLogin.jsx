import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../assets/lo.png";

const MechanicLogin = () => {
  const [formData, setFormData] = useState({
    email_address: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors
    try {
      const response = await axios.post(
        "http://176.119.254.225:80/mechanic/login",
        {
          email: formData.email_address, // match backend field name
          password: formData.password,
        }
      );

      const { token, user_id,  workshop_id, approval_status, workshop_name } =
        response.data;
      console.log("Login response:", response.data); // Debugging line

      // Save to localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", user_id);
      localStorage.setItem("approvalStatus", approval_status);
      localStorage.setItem("workshopName", workshop_name);
      localStorage.setItem("workshopId", workshop_id);
      console.log("workshop_id:",workshop_id); // Debugging line

      // Navigate with workshop_name state
      navigate(
        "/mechanic-dashboard",
        {
          state: { workshop_name, workshop_id }, // Pass the workshop_id to the dashboard
        } // Pass the workshop_name to the dashboard
      );
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#086189] relative hidden md:flex items-center justify-center">
        <img
          src={bgImage}
          alt="car service"
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="z-10 text-white text-center px-6">
          <h2 className="text-3xl font-bold">Mechanic Portal</h2>
          <p className="mt-4">Manage your workshop and bookings easily.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#064d6b] p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#064d6b] mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Login to your mechanic account
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                name="email_address"
                placeholder="Email"
                value={formData.email_address}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086189]"
                required
              />
            </div>
            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086189]"
                required
              />
              <span
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {formData.showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-[#086189] text-white font-bold py-3 rounded-lg hover:bg-[#064d6b] transition"
            >
              Login
            </button>
            <p className="text-sm text-[#064d6b] text-right mt-2 cursor-pointer hover:underline">
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MechanicLogin;