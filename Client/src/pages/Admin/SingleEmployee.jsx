import { imageAsset } from "@/assets/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminContext } from "@/context/adminContext";
import { Edit } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleEmployee = () => {
  const { departments, employees } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState(null); 

  const formatDate = (date) => {
    const formattedDate = moment(date).format("DD MMMM, YYYY");
    return formattedDate;
  }

  useEffect(() => {
    const data = employees?.find(emp => emp._id == id)
    setEmployeeDetails(data);
  }, [])
  

  if (!employeeDetails) {
    return <div>Loading...</div>; // Show loading while waiting for data
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-3'>Employee Details <Edit onClick={() => navigate(`/admin/employee/edit/${employeeDetails._id}`)} className="w-4 text-blue-600 cursor-pointer"/></CardTitle>
        </CardHeader>
        <CardContent>
          {employeeDetails.image ? <img src={employeeDetails.image} alt="Employee" className="w-24 mb-4" /> : <img src={employeeDetails.gender === 'male' ? imageAsset.maleAvatar : imageAsset.femaleAvatar} alt="Employee" className="w-24 mb-4" />}
          <p className="mb-3"><span className="font-semibold">Name:</span> {employeeDetails.name}</p>
          <p className="mb-3"><span className="font-semibold">Email:</span> {employeeDetails.email}</p>
          <p className="mb-3"><span className="font-semibold">Date of Birth:</span> {formatDate(employeeDetails.dob)}</p>
          <p className="mb-3"><span className="font-semibold">Gender:</span> {employeeDetails.gender}</p>
          <p className="mb-3"><span className="font-semibold">Phone:</span> {employeeDetails.phone}</p>
          <p className="mb-3"><span className="font-semibold">Department:</span> {departments.find(dept => dept._id == employeeDetails.department).name}</p>
          <p className="mb-3"><span className="font-semibold">Designation:</span> {employeeDetails.designation}</p>
          <p className="mb-3"><span className="font-semibold">Salary:</span> {employeeDetails.salary}₹</p>
          <p className="mb-3"><span className="font-semibold">Address:</span> {employeeDetails.address}</p>
          <p className="mb-3"><span className="font-semibold">Qualification:</span> {employeeDetails.qualification}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleEmployee;
