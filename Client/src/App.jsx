import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import Employees from "./pages/Admin/Employees";
import Settings from "./pages/Admin/Settings";
import Salary from "./pages/Admin/Salary";
import Leaves from "./pages/Admin/Leaves";
import Departments from "./pages/Admin/Departments";
import AdminCommonLayout from "./pages/CommonLayout/AdminCommonLayout";
import EmployeeCommonLayout from "./pages/CommonLayout/EmployeeCommonLayout";
import ProtectedRoute from "./config/ProtectedRoute";
import AddEmployee from "./pages/Admin/AddEmployee";
import SingleEmployee from "./pages/Admin/SingleEmployee";
import EditEmployee from "./pages/Admin/EditEmployee";
import SalaryRecord from "./pages/Admin/SalaryRecord";
import EmployeeDashboard from "./pages/Employee/Dashboard";
import EmployeeProfile from "./pages/Employee/Profile";
import EmployeeLeave from "./pages/Employee/Leave";
import EmployeeSalary from "./pages/Employee/Salary";
import EmployeeSettings from "./pages/Employee/Settings";
import LeaveRecord from "./pages/Admin/LeaveRecord";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Login />} />} />
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute element={<AdminCommonLayout />} />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employee" element={<Employees />} />
        <Route path="employee/:id" element={<SingleEmployee />}/>
        <Route path="employee/edit/:id" element={<EditEmployee />}/>
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="employee/salary-record/:id" element={<SalaryRecord />} />
        <Route path="employee/leave-record/:id" element={<LeaveRecord />} />
        <Route path="departments" element={<Departments />} />
        <Route path="leaves" element={<Leaves />} />
        <Route path="salary" element={<Salary />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Employee Routes */}
      <Route path="/employee" element={<ProtectedRoute element={<EmployeeCommonLayout />} />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="my-profile" element={<EmployeeProfile />} />
        <Route path="leave" element={<EmployeeLeave />} />
        <Route path="salary" element={<EmployeeSalary />} />
        <Route path="settings" element={<EmployeeSettings />} />
      </Route>

      {/* Catch All Route */}
      <Route path="*" element={<div>No Page Found</div>} />
    </Routes>
  );
};

export default App;
