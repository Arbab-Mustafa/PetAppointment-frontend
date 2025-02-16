import { useContext } from "react";
import { AppointmentContext } from "../context/AppointmentContext";

const AdminView = () => {
  const { appointments } = useContext(AppointmentContext);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin View</h1>
      <ul>
        {appointments.map((appointment) => (
          <li
            key={appointment._id}
            className="p-4 bg-white shadow rounded mb-4"
          >
            <h2 className="text-lg font-semibold">{appointment.petName}</h2>
            <p>{new Date(appointment.date).toLocaleDateString()}</p>
            <p>
              Owner: {appointment.owner.name} ({appointment.owner.email})
            </p>
            <p>{appointment.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminView;
