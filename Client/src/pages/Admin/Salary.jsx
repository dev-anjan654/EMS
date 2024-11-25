import React, { useContext, useState } from "react";
import FormControl from "@/components/comp/FormControl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addSalaryFormControl } from "@/config";
import { AdminContext } from "@/context/adminContext";
import { Loader2 } from "lucide-react";

const Salary = () => {
  const {departments, employees, addSalaryInputValue, setAddSalaryInputValue, addSalary, isSubmitting} = useContext(AdminContext);

  const filterEmployeeByDepartment = employees.filter(emp => emp.department === addSalaryInputValue.department);

  const updatedFormControl = addSalaryFormControl.map(item => {
    if(item.name === 'department') {
      return {...item, options: departments.map(dept => ({
        label: dept.name,
        value: dept._id
      }))}}

    if(item.name === 'employee') {
      return {
        ...item, options: filterEmployeeByDepartment.map(emp => (
          {label: emp.name, value: emp._id}
        ))
      }
    }
    return item;
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSalary();
  };

  return (
    <div className="w-full h-full p-4 overflow-y-scroll">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">Add Salary</h1>
      <Card className="p-4">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <FormControl
              formControl={updatedFormControl}
              formData={addSalaryInputValue}
              setFormData={setAddSalaryInputValue}
            />
            <div className="mt-3">
              <Button type="submit" disabled={isSubmitting ? true : false}>
                {isSubmitting ? <><Loader2 className="animate-spin"/> Please Wait</> : 'Submit'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Salary;