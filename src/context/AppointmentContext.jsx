/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useContext } from "react";
import { getAppointments } from "../api/appointmentApi";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getAppointments(token);
        setAppointments(data);
      } catch (error) {
        toast.error("Failed to load appointments" + error.message);
      }
    };

    fetchAppointments();
  }, [user]);

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};
