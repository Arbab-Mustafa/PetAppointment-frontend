import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateAppointment } from "../api/appointmentApi";
import { AppointmentContext } from "../context/AppointmentContext";
import { toast } from "react-toastify";

const EditAppointment = () => {
  const { id } = useParams(); // ✅ Get APPOINTMENT_ID from URL
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ petName: "", date: "", description: "" });

  useEffect(() => {
    const appointment = appointments.find((a) => a._id === id);
    if (appointment) {
      setForm({
        petName: appointment.petName,
        date: appointment.date,
        description: appointment.description,
      });
    }
  }, [appointments, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.petName || !form.date) {
      toast.error("Pet name and date are required.");
      return;
    }

    try {
      console.log("📨 Sending Update Request:", form);
      await updateAppointment(id, form);

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, ...form } : a))
      );

      toast.success("Appointment updated!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Update Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to update appointment."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Appointment</h2>
        <input
          className="w-full mb-2 p-2 border rounded"
          type="text"
          name="petName"
          placeholder="Pet Name"
          value={form.petName}
          onChange={handleChange}
        />
        <input
          className="w-full mb-2 p-2 border rounded"
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button className="w-full bg-primary   py-2 rounded  bg-green-700">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditAppointment;
