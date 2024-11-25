import FormControl from '@/components/comp/FormControl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { changePasswordFormControl } from '@/config';
import { EmployeeContext } from '@/context/employeeContext';
import { Loader2 } from 'lucide-react';
import React, { useContext } from 'react';

const EmployeeSettings = () => {

  const {changePasswordInput, setChangePasswordInput, changePassword, isSubmitting} = useContext(EmployeeContext);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await changePassword();
  }

  return (
    <div className='w-full h-full p-4 overflow-y-auto flex justify-center items-center'>
      <Card>
        <CardHeader className='p-0 pt-3'><CardTitle className='text-center text-xl'>Change Password</CardTitle></CardHeader>
        <CardContent className='w-[450px] px-5 py-6 '>
          <form onSubmit={handleChangePassword} className='w-full flex flex-col gap-3'>
            <FormControl formControl={changePasswordFormControl} formData={changePasswordInput} setFormData={setChangePasswordInput}/>
            <Button type='submit' className='w-full' disabled={isSubmitting ? true : false}>
              {isSubmitting ? <><Loader2 className='animate-spin'/> Pleasw Wait</> : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeSettings