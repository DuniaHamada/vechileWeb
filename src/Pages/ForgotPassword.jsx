import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../../assets/lo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post(
        "http://176.119.254.225:80/mechanic/forgot-password",
        { email }
      );
      setMessage(response.data.message || "Password reset instructions sent.");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to send reset email.");
      } else {
        setError("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="flex h-screen font-['Poppins']">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#086189] relative hidden md:flex items-center justify-center">
        <img
          src={bgImage}
          alt="car service"
          className="absolute w-full h-full object-cover opacity-50"
        />
        <div className="z-10 text-white text-center px-6">
          <h2 className="text-3xl font-bold">Mechanic Portal</h2>
          <p className="mt-4">Reset your password easily and securely.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#064d6b] p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#064d6b] mb-2">
            Forgot Password
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Enter your email to receive reset instructions
          </p>
          {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#086189]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#086189] text-white font-bold py-3 rounded-lg hover:bg-[#064d6b] transition"
            >
              Send Reset Link
            </button>
            <p
              onClick={() => navigate("/mechanic-login")}
              className="text-sm text-[#064d6b] text-right mt-2 cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
