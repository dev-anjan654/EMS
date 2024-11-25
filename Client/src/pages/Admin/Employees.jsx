import { imageAsset } from "@/assets/assets";
import Alert from "@/components/comp/AlertDialog";
import LoadingSkeleton from "@/components/comp/LoadingSkeleton";
import TooltipComp from "@/components/comp/Tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminContext } from "@/context/adminContext";
import { Banknote, Edit, Eye, ListOrdered, LogOut, Plus, Search } from "lucide-react";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Employees = () => {
  const navigate = useNavigate();
  const {showAlert, setShowAlert, getAllEmployee, employees, isLoading, deleteEmployee, setEmployeeId} = useContext(AdminContext);

  const descendingEmployees = employees?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleDelete = async (id) => {
    setEmployeeId(id);
    setShowAlert(true);
  }


  return (
    <div className="w-full h-full p-4 overflow-y-scroll">

      <Alert
        showAlert={showAlert}
        onClose={() => setShowAlert(false)}
        type="delete"
        onAction={deleteEmployee}
      />

      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Manage Employee
      </h1>

      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Search className="text-black"/>
          <Input placeholder="Serach here" className="w-52" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
        <Button className="bg-primary" onClick={() => navigate('/admin/add-employee')}>
          <Plus />
          Add Employee
        </Button>
      </div>
      
      {isLoading ? <LoadingSkeleton /> : 
      <Table className='border'>
        <TableHeader>
          <TableRow className='bg-gray-200'>
            <TableHead className='text-black'>Sl No.</TableHead>
            <TableHead className='text-black'>Image</TableHead>
            <TableHead className='text-black'>Emp. Name</TableHead>
            <TableHead className='text-black'>D.O.B.</TableHead>
            <TableHead className="text-right text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {descendingEmployees?.length > 0 ? 
          descendingEmployees?.filter(emp => emp.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.image ? <img src={item.image} alt="" className="w-12 h-12 rounded-full"/> : <img src={item.gender === 'male' ? imageAsset.maleAvatar : imageAsset.femaleAvatar} alt="" className="w-12 rounded-full"/>}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{moment(item.dob).format('DD MMMM, YYYY')}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <TooltipComp button={<Button variant='outline' onClick={() => navigate(`/admin/employee/${item._id}`)}><Eye /></Button>} content='View'/>
                <TooltipComp button={<Button className='bg-yellow-500' onClick={() => navigate(`/admin/employee/leave-record/${item._id}`)}><ListOrdered /></Button>} content='Leaves'/>
                <TooltipComp button={<Button className='bg-blue-600' onClick={() => navigate(`/admin/employee/edit/${item._id}`)}><Edit /></Button>} content='Edit'/>
                <TooltipComp button={<Button className='bg-green-500' onClick={() => navigate(`/admin/employee/salary-record/${item._id}`)}><Banknote /></Button>} content='Salary'/>
                <TooltipComp button={<Button variant='destructive' onClick={() => handleDelete(item._id)}><LogOut /></Button>} content='Leave'/>
              </TableCell>
            </TableRow>
          )) : 
          (
            <TableRow>
              <TableCell colSpan={5} className='h-14 text-center text-lg'>No Employee Found</TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>}
    </div>
  );
};

export default Employees;