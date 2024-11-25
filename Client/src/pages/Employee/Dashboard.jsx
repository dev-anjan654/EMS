import { Card, CardContent } from '@/components/ui/card';
import { EmployeeContext } from '@/context/employeeContext'
import React, { useContext } from 'react';
import { imageAsset } from '@/assets/assets';

const EmployeeDashboard = () => {
    const {employeeData} = useContext(EmployeeContext);

  return (
    <div className='w-full h-full p-4 overflow-y-auto'>
        <Card>
            <CardContent className='flex gap-3 p-0'>
                <div>
                    {employeeData?.image ? <img src={employeeData?.image} alt="" className='w-16 rounded-s-md'/> : 
                    <img src={employeeData?.gender === 'male' ? imageAsset.maleAvatar : imageAsset.femaleAvatar} alt="" className='w-16 rounded-s-md'/>
                    }
                </div>
                <div className='p-2'>
                    <p className=''>Welcome Back</p>
                    <p className='text-xl font-semibold'>{employeeData?.name}</p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default EmployeeDashboard