import { useContext, useState } from "react";
import { AppointmentContext } from "../context/AppointmentContext";
import { AuthContext } from "../context/AuthContext";
import { deleteAppointment } from "../api/appointmentApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaSort, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const { user, setUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("date"); // ✅ New state to select sorting type
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      console.log("🗑️ Deleting Appointment ID:", id);
      await deleteAppointment(id);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success("Appointment deleted successfully!");
    } catch (error) {
      console.error("❌ Delete Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to delete appointment."
      );
    }
  };

  // ✅ Sorting logic for Date & Name
  const sortedAppointments = [...appointments]
    .filter((a) => a.petName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.petName.localeCompare(b.petName)
          : b.petName.localeCompare(a.petName);
      }
      return 0;
    });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
          Welcome, {user.name}
        </h1>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition w-full sm:w-auto"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
        Appointments
      </h1>

      {/* Search & Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by pet name..."
          className="p-3 border border-gray-300 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition w-full sm:w-auto"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <FaSort /> {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Book Appointment Button */}
      <div className="text-center sm:text-right mb-4">
        <Link
          to="/book-appointment"
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition w-full sm:w-auto mx-auto sm:mx-0"
        >
          <FaPlus /> Book Appointment
        </Link>
      </div>

      {/* Appointments List */}
      <ul className="mt-4 space-y-4 overflow-y-auto h-[30rem] sm:h-[37rem]">
        {sortedAppointments.map((appointment) => (
          <li
            key={appointment._id}
            className="p-5 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {appointment.petName}
            </h2>
            <p className="text-gray-600">
              {new Date(appointment.date).toLocaleDateString()}
            </p>
            <p className="text-gray-500">{appointment.description}</p>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <Link
                to={`/edit-appointment/${appointment._id}`}
                className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
              >
                <FaEdit /> Edit
              </Link>
              {(user.role === "admin" ||
                user._id === appointment.owner._id) && (
                <button
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition w-full sm:w-auto"
                  onClick={() => handleDelete(appointment._id)}
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
