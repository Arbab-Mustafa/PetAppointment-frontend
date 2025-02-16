import "./App.css";
import "tailwindcss";
import { AuthProvider } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import AppRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <AppRoutes />
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
