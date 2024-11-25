import { imageAsset } from '@/assets/assets';
import { Card, CardContent } from '@/components/ui/card'
import { AdminContext } from '@/context/adminContext';
import { EmployeeContext } from '@/context/employeeContext'
import moment from 'moment';
import React, { useContext } from 'react'

const EmployeeProfile = () => {
  const {employeeData} = useContext(EmployeeContext);
  const {departments} = useContext(AdminContext);

  const fromatDate = (date) => {
    const formattedDate = moment(date).format('DD MMMM, YYYY');
    return formattedDate;
  }
  
  return (
    <div className='w-full h-full p-4 overflow-y-auto flex items-center justify-center'>
      <Card className='h-[80%] w-full'>
        <CardContent className='p-0 h-full'>
          <div className='w-full h-24 bg-gray-200 rounded-t-md relative'>
            {
              employeeData?.image ? <img src={employeeData?.image} alt="" className='w-20 h-20 rounded-full absolute -bottom-8 left-6'/> : 
              <img src={employeeData?.gender === 'male' ? imageAsset.maleAvatar : imageAsset.femaleAvatar} alt="" className='w-20 h-20 rounded-full absolute -bottom-8 left-6'/>
            }
          </div>
          <div className='pt-12 pl-3 flex flex-col gap-2'>
            <p>Name: {employeeData?.name}</p>
            <p>Email: {employeeData?.email}</p>
            <p>Mobile No: {employeeData?.phone}</p>
            <p>Gender: {employeeData?.gender}</p>
            <p>Date of Birth: {fromatDate(employeeData?.dob)}</p>
            <p>Qualification: {employeeData?.qualification}</p>
            <p>Department: {departments?.find(dept => dept._id === employeeData.department)?.name}</p>
            <p>Designation: {employeeData?.designation}</p>
            <p>Date of Joining: {fromatDate(employeeData?.joiningDate)}</p>
            <p>Address: {employeeData?.address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeProfile