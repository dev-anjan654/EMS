import { icons } from "@/assets/assets";
import Widget from "@/components/comp/Widget";
import { AdminContext } from "@/context/adminContext";
import React, { useContext } from "react";

const AdminDashboard = () => {
  const {departments, employees, allLeaveData} = useContext(AdminContext);

  const totalSalary = employees?.reduce((accumulatedSalary, employee) => {
    return accumulatedSalary + employee.salary;
  }, 0);

  const primaryInfo = [
    {
      title: "Employees",
      icon: icons.users,
      count: employees?.length,
    },
    {
      title: "Departments",
      icon: icons.department,
      count: departments?.length,
    },
    {
      title: "Monthly Pay",
      icon: icons.money,
      money: totalSalary + ' ₹',
    },
  ];

  const leaveDetails = [
    {
      title: "Applied",
      icon: icons.document,
      count: allLeaveData?.length,
    },
    {
      title: "Approved",
      icon: icons.approved,
      count: allLeaveData?.filter(item => item.status === 'approved').length,
    },
    {
      title: "Pending",
      icon: icons.pending,
      count: allLeaveData?.filter(item => item.status === 'pending').length,
    },
    {
      title: "Rejected",
      icon: icons.rejected,
      count: allLeaveData?.filter(item => item.status === 'rejected').length,
    },
  ];

  return (
    <div className="w-full h-full p-4 overflow-y-scroll">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Dashboard Overview
      </h1>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-center mb-[50px]">
        {primaryInfo.map((Item, index) => (
          <Widget
            key={index}
            icon={Item.icon}
            count={Item.count}
            money={Item.money}
            title={Item.title}
          />
        ))}
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Leave Details
      </h1>
      <div className="flex justify-between items-center gap-4 flex-col lg:flex-row">
        {leaveDetails.map((item, index) => (
          <Widget
            key={index}
            icon={item.icon}
            count={item.count}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
