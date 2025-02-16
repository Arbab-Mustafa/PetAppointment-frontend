import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("🔍 Sending login request...", form);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        form
      );

      console.log("✅ Login Response:", response.data); // Log API response
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      setUser(user);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message); // Log error
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 tracking-wide">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 shadow-sm"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 shadow-sm"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 text-lg shadow-md transform active:scale-95 hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">Dont have an account?</p>
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline transition duration-200"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
