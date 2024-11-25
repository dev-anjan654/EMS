import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Delete, Edit, Plus, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useContext, useEffect, useState } from 'react';
import TooltipComp from '@/components/comp/Tooltip';
import AddDepartmentDialog from '@/components/admin/AddDepartmentDialog';
import { AdminContext } from '@/context/adminContext';
import LoadingSkeleton from '@/components/comp/LoadingSkeleton';
import Alert from '@/components/comp/AlertDialog';
import EditDepartmentDialog from '@/components/admin/EditDepartmentDialog';

const Departments = () => {

  const {showAlert, setShowAlert, addDepartment, inputDeptValue, setInputDeptValue, inputUpdatedDeptValue, setInputUpdatedDeptValue, isOpenAddDeptDialog, setIsOpenAddDeptDialog, isOpenEditDeptDialog, setIsOpenEditDeptDialog, getAllDepartment, departments, isLoading, setDepartmentId, deleteDepartment, editDepartment} = useContext(AdminContext);

  const [searchValue, setSearchValue] = useState('');

  const handleAddDepartment = async () => {
    await addDepartment();
  }

  const handleEditDepartment = (id) => {
    setIsOpenEditDeptDialog(true);
    setDepartmentId(id)
  }
  
  const handleDeleteClick = (id) => {
    setDepartmentId(id);
    setShowAlert(true);
  };

  useEffect(() => {
    getAllDepartment();
  }, [])

  return (
    <div className='w-full h-full p-4 overflow-y-scroll'>
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">
        Manage Department
      </h1>
      <AddDepartmentDialog 
        isOpen={isOpenAddDeptDialog}
        setIsOpen={setIsOpenAddDeptDialog} 
        onAction={handleAddDepartment} 
        inputValue={inputDeptValue} 
        setInputValue={setInputDeptValue}
      />

      <EditDepartmentDialog 
        isOpen={isOpenEditDeptDialog}
        setIsOpen={setIsOpenEditDeptDialog}
        onAction={editDepartment}
        inputValue={inputUpdatedDeptValue}
        setInputValue={setInputUpdatedDeptValue}
      />
      
      <Alert
        showAlert={showAlert}
        onClose={() => setShowAlert(false)}
        type="delete"
        onAction={deleteDepartment}
      />
      
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Search className="text-black" />
          <Input placeholder="Search here" className="w-52" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
        </div>
        <Button className="bg-primary" onClick={() => setIsOpenAddDeptDialog(true)}>
          <Plus />
          Add Department
        </Button>
      </div>

      {isLoading ? <LoadingSkeleton /> : 
      <Table className='border'>
        <TableHeader>
          <TableRow className='bg-gray-200'>
            <TableHead className='text-black'>Sl No.</TableHead>
            <TableHead className='text-black'>Department</TableHead>
            <TableHead className="text-right text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { 
          departments?.length > 0 ? 
          departments?.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <TooltipComp button={<Button className='bg-blue-600' onClick={() => handleEditDepartment(item._id)}><Edit /></Button>} content='Edit'/>
                <TooltipComp button={<Button variant='destructive' onClick={() => handleDeleteClick(item._id)}><Delete /></Button>} content='Delete'/>
              </TableCell>
            </TableRow>
          )) : 
        (
          <TableRow>
            <TableCell colSpan={3} className='h-14 text-center text-lg'>No Department Found</TableCell>
          </TableRow>
        )
        }
        </TableBody>
      </Table>}
    </div>
  );
}

export default Departments;
