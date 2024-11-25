import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AdminContext } from '@/context/adminContext';
import moment from 'moment';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';

const LeaveRecord = () => {

  const {id} = useParams();

  const {getAllLeaves, allLeaveData, employees, departments} = useContext(AdminContext);
  const leavesOfTheEmployee = allLeaveData?.filter(item => item.employeeId == id);

  const [selectInput, setSelectinput] = useState('');
  const [filteredData, setFilteredData] = useState(leavesOfTheEmployee);

  const handleSelect = (value) => {
    setSelectinput(value);

    if(value === 'all') {
        setFilteredData(leavesOfTheEmployee);
    } else {
        const sortedData = leavesOfTheEmployee?.filter(item => item.status === value);
        setFilteredData(sortedData);
    }
  }

  return (
    <div className='w-full h-full p-4 overflow-y-auto'>
        <h1 className='mb-5 text-2xl font-semibold'>Leave Records</h1>

        <Select value={selectInput} onValueChange={handleSelect}>
            <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Short By'/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='approved'>Approved</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
        </Select>
        
      <Table className='border mt-5'>
        <TableHeader>
          <TableRow className='bg-gray-200'>
            <TableHead className='text-black'>Sl No.</TableHead>
            <TableHead className='text-black'>Type</TableHead>
            <TableHead className='text-black'>From-Date</TableHead>
            <TableHead className='text-black'>To-Date</TableHead>
            <TableHead className='text-black'>Apply Date</TableHead>
            <TableHead className='text-black'>Description</TableHead>
            <TableHead className="text-right text-black">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredData?.length > 0 ?
            filteredData?.map((leave, index) => (
              <TableRow key={leave._id} className='h-14'>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{leave.type}</TableCell>
                <TableCell className="font-medium">{moment(leave.fromDate).format('DD-MM-YYYY')}</TableCell>
                <TableCell className="font-medium">{moment(leave.toDate).format('DD-MM-YYYY')}</TableCell>
                <TableCell className="font-medium">{moment(leave.createdAt).format('DD-MM-YYYY')}</TableCell>
                <TableCell className="font-medium">{leave.description}</TableCell>
                <TableCell className={`font-medium text-end text-white`}>
                  <span className={`py-1 px-2 text-sm rounded-md ${leave.status === 'pending' ? 'bg-orange-500' : leave.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {leave.status.replace(/^./, leave.status[0].toUpperCase())}
                  </span>
                </TableCell>
              </TableRow>
            )) : 
            (
              <TableRow>
                <TableCell colSpan={7} className='h-14 text-center text-lg'>No Record Found</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default LeaveRecord