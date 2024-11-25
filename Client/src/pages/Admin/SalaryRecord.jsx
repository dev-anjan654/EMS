import LoadingSkeleton from '@/components/comp/LoadingSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AdminContext } from '@/context/adminContext'
import moment from 'moment';
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const SalaryRecord = () => {

    const {employees, salaryRecord, getSalaryRecord, isLoading} = useContext(AdminContext);
    const {id} = useParams();

    useEffect(() => {
        getSalaryRecord(id);
    }, [id])

  const sortedSalaryData = salaryRecord?.sort((a, b) => new Date(b.payDate) - new Date(a.payDate));

  const lastMonthSalary = moment(sortedSalaryData[0]?.payDate).format('MM');

  const currentMonth = moment().format('MM');

  const isSalaryDue = lastMonthSalary !== currentMonth;

  if (isLoading || !salaryRecord) {
    return <LoadingSkeleton/>;
  }
    
  return (
    <div className='w-full h-full p-4 overflow-y-scroll'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-5'>{employees.find(emp => emp._id == id).name}</h1>

        {isLoading ? <LoadingSkeleton /> : 
        <Table className='border'>
        <TableHeader>
          <TableRow className='bg-gray-200'>
            <TableHead className='text-black'>Sl No.</TableHead>
            <TableHead className='text-black'>Employee Id</TableHead>
            <TableHead className='text-black'>Date</TableHead>
            <TableHead className='text-black'>Salary</TableHead>
            <TableHead className='text-black'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {isSalaryDue && 
            <TableRow>
              <TableCell className="font-medium">0</TableCell>
              <TableCell>{id}</TableCell>
              <TableCell>{currentMonth - lastMonthSalary} Month</TableCell>
              <TableCell>{employees.find(emp => emp._id == id).salary * (currentMonth - lastMonthSalary)}₹</TableCell>
              <TableCell><span className='bg-red-500 text-white px-2 py-1 rounded-md'>Due</span></TableCell>
            </TableRow>}
          {
          sortedSalaryData?.length > 0 ?
          sortedSalaryData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.employeeId}</TableCell>
              <TableCell>{moment(item.payDate).format('DD MMMM, YYYY')}</TableCell>
              <TableCell>{item.salary}₹</TableCell>
              <TableCell>{<span className='bg-green-500 text-white px-2 py-1 rounded-md'>Paid</span>}</TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className='h-14 text-center text-lg'>No Record Found</TableCell>
            </TableRow>
          )
        }
        </TableBody>
        </Table>}
    </div>
  )
}

export default SalaryRecord