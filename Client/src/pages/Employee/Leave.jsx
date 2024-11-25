import LoadingSkeleton from '@/components/comp/LoadingSkeleton'
import AddEmployeeDialog from '@/components/employee/AddEmployeeDialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { EmployeeContext } from '@/context/employeeContext'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'

const EmployeeLeave = () => {

  const { isLoading, openAddLeaveDialog, setOpenAddLeaveDialog, applyLeaveInput, setApplyLeaveInput, applyLeave, leavesRecord, getLeaveRecord } = useContext(EmployeeContext);
  
  const descendingLevaeList = leavesRecord.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [shortValue, setShortValue] = useState('all'); 
  const [filterData, setFilterData] = useState(descendingLevaeList);

  useEffect(() => {
    getLeaveRecord();
  }, [])

  const handleShort = (value) => {
    setShortValue(value);
    if(value === 'all') {
      setFilterData(descendingLevaeList);
    } else {
      const data = descendingLevaeList?.filter(item => item.status === value);
      setFilterData(data);
    }
  }

  const handleApply = async () => {
    await applyLeave();
    await getLeaveRecord();
  }

  return (
    <div className='w-full h-full p-4 overflow-y-auto'>
      <AddEmployeeDialog onAction={handleApply} isOpen={openAddLeaveDialog} setIsOpen={setOpenAddLeaveDialog} inputValue={applyLeaveInput} setInputValue={setApplyLeaveInput} />
      
      <h1 className='font-semibold text-2xl mb-6'>Manage Leaves</h1>
      <div className='flex items-center justify-between mb-5'>
        
        {/* Filter Dropdown */}
        <Select value={shortValue} onValueChange={handleShort}>
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Sort By'/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='approved'>Approved</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
            <SelectItem value='rejected'>Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => setOpenAddLeaveDialog(true)}>Leave Apply</Button>
      </div>

      {/* Leave Table */}
      {isLoading ? <LoadingSkeleton /> : 
      <Table className='border'>
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
            filterData?.length > 0 ?
            filterData?.map((leave, index) => (
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
            )) : (
              <TableRow>
                <TableCell colSpan={7} className='h-14 text-center text-lg'>No Record Found</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>}
    </div>
  );
}

export default EmployeeLeave;
