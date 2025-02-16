import { useState, useContext } from "react";
import { createAppointment } from "../api/appointmentApi";
import { AppointmentContext } from "../context/AppointmentContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const [form, setForm] = useState({ petName: "", date: "", description: "" });
  const { setAppointments } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate required fields
    if (!form.petName || !form.date) {
      toast.error("Pet name and date are required.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to book an appointment.");
        navigate("/login");
        return;
      }

      console.log("📨 Submitting Form:", form); // ✅ Debug form data

      const newAppointment = await createAppointment(form);
      setAppointments((prev) => [...prev, newAppointment.data]);

      toast.success("Appointment booked successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Booking Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to create appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Book Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Pet Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
              type="text"
              name="petName"
              placeholder="Enter pet's name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Appointment Date & Time
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
              type="datetime-local"
              name="date"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description (Optional)
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition"
              name="description"
              placeholder="Enter appointment details"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-primary text-white font-semibold py-2 rounded-lg transition duration-300  ${
              loading ? "opacity-50 cursor-not-allowed" : " bg-green-700"
            }`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
