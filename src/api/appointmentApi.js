import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/appointments";

export const updateAppointment = async (id, updatedData) => {
  console.log("🔍 Updating Appointment:", id);
  console.log("📨 Request Data:", JSON.stringify(updatedData));

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    updatedData,
    getAuthHeader()
  );

  console.log("✅ Appointment Updated:", response.data);
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  console.log("🗑️ Deleting Appointment:", appointmentId); // ✅ Debugging

  const response = await axios.delete(
    `${API_BASE_URL}/${appointmentId}`,
    getAuthHeader()
  );

  console.log("✅ Appointment Deleted:", response.data); // ✅ Debugging
  return response.data;
};

/////////////////////////////////////////////////////

export const getAppointments = async () => {
  console.log("🔍 Fetching appointments from:", API_BASE_URL); // ✅ Debugging

  const response = await axios.get(API_BASE_URL, getAuthHeader());

  console.log("✅ Appointments Retrieved:", response.data); // ✅ Debugging
  return response.data.data;
};

// ------------------------------

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // ✅ Ensure JSON format
    },
  };
};

export const createAppointment = async (appointmentData) => {
  console.log("🔍 Sending request to:", API_BASE_URL);
  console.log("📨 Request Data:", JSON.stringify(appointmentData)); // ✅ Check if data exists

  const response = await axios.post(
    API_BASE_URL,
    appointmentData,
    getAuthHeader()
  );

  console.log("✅ Appointment Created:", response.data);
  return response.data;
};
