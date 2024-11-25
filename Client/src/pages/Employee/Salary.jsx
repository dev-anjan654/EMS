import LoadingSkeleton from '@/components/comp/LoadingSkeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EmployeeContext } from '@/context/employeeContext';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';

const EmployeeSalary = () => {
  const {getSalaryRecord, salaryRecords, employeeData, isLoading} = useContext(EmployeeContext);

  const sortedSalaryData = salaryRecords?.sort((a, b) => new Date(b.payDate) - new Date(a.payDate));

  const lastMonthSalary = moment(sortedSalaryData[0]?.payDate).format('MM');

  const currentMonth = moment().format('MM');

  const isSalaryDue = lastMonthSalary !== currentMonth;

  useEffect(() => {
    getSalaryRecord();
  }, [])

  return (
    <div className='w-full h-full overflow-y-auto p-4'>
      <h1 className='text-2xl font-semibold mb-5'>Salary Records</h1>
      {isLoading ? <LoadingSkeleton /> : 
      <Table className='border'>
        <TableHeader className='bg-gray-200'>
          <TableRow>
            <TableHead>Sl. No</TableHead>
            <TableHead>Total Salary</TableHead>
            <TableHead>Pay Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSalaryDue && 
           <TableRow>
            <TableCell>0</TableCell>
            <TableCell>{employeeData?.salary * (currentMonth - lastMonthSalary)}₹</TableCell>
            <TableCell>{currentMonth - lastMonthSalary} Month</TableCell>
            <TableCell><span className='bg-red-500 text-white px-2 py-1 rounded-md'>Due</span></TableCell>
           </TableRow>
          }
          {
            sortedSalaryData?.length > 0 ?
            sortedSalaryData?.map((salary, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{salary.salary}₹</TableCell>
                <TableCell>{moment(salary.payDate).format('DD-MM-YYYY')}</TableCell>
                <TableCell><span className='bg-green-500 text-white px-2 py-1 rounded-md'>Paid</span></TableCell>
              </TableRow>
            )) : 
            <TableRow>
              <TableCell colSpan={4} className="h-14 text-lg text-center">
                No Record Found
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>}
    </div>
  )
}

export default EmployeeSalary