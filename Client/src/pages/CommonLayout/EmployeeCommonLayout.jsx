import Alert from "@/components/comp/AlertDialog";
import Sidebar from "@/components/sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { employeeRoutes } from "@/config";
import { AuthContext } from "@/context/authContext";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

const EmployeeCommonLayout = () => {

    const { showLogoutAlert, setShowLogoutAlert, logoutUser } = useContext(AuthContext);

    return (
        <main className="h-screen flex">
          <Sidebar routes={employeeRoutes}/>
          <Alert
            showAlert={showLogoutAlert}
            onClose={() => setShowLogoutAlert(false)}
            type="logout"
            onAction={logoutUser}
          />
          <Toaster />
          <Outlet />
        </main>
      );
}

export default EmployeeCommonLayout