import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import AdminContextProvider from "./context/adminContext";
import EmployeeContextProvider from "./context/employeeContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <AdminContextProvider>
        <EmployeeContextProvider>
          <App />
        </EmployeeContextProvider>      
      </AdminContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
