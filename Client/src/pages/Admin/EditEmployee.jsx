import { imageAsset } from '@/assets/assets'
import FormControl from '@/components/comp/FormControl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addEmployeeFormControl } from '@/config'
import { AdminContext } from '@/context/adminContext'
import { Loader2 } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditEmployee = () => {

    const {editEmployee, isSubmitting, departments, employees, employeeUpdateInputValue, setEmployeeUpdateInputValue, setEmployeeId, employeeImgInput, setEmployeeImgInput} = useContext(AdminContext);
    const {id} = useParams();

    useEffect(() => {
        setEmployeeId(id);
    }, [id])


    const updatedFormControl = addEmployeeFormControl.filter((item) => item.name !== "password" && item.name !== "cnf_password").map((item) => {
        if (item.name === "department") {
          return {
            ...item,
            options: departments.map((dept) => ({
              label: dept.name,
              value: dept._id,
            })),
          };
        }
        return item;
      });

    const employeeImg = employees.find(emp => emp._id == id).image;

    const handleUpdate = async (e) => {
      e.preventDefault();
      await editEmployee();
    }

  return (
    <div className='w-full h-screen p-4 overflow-y-scroll'>
        <form onSubmit={handleUpdate}>
            <FormControl formControl={updatedFormControl} formData={employeeUpdateInputValue} setFormData={setEmployeeUpdateInputValue}/>
            <div className='flex gap-6 items-center'>
              <Label htmlFor='file' className='w-48 flex flex-col items-center'>
                <img src={imageAsset.uploadLabel} alt="" className='w-44'/>
                <p>Choose File</p>
              </Label>
              <img src={employeeImgInput ? URL.createObjectURL(employeeImgInput) : employeeImg} alt="" className='w-20'/>
            </div>
            <Input id='file' type='file' className='hidden' onChange={(e) => setEmployeeImgInput(e.target.files[0])}/> 
            <Button type='submit' disabled={isSubmitting ? true : false} className='mt-3'>
              {isSubmitting ? <><Loader2 className="animate-spin"/> Please Wait</> : 'Save Changes'}
            </Button>
        </form>
    </div>
  )
}

export default EditEmployee