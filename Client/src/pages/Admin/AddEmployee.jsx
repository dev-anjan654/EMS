import { imageAsset } from "@/assets/assets";
import FormControl from "@/components/comp/FormControl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addEmployeeFormControl } from "@/config";
import { AdminContext } from "@/context/adminContext";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";

const AddEmployee = () => {
  const {
    employeeInputValue,
    setEmployeeInputValue,
    departments,
    addEmployee,
    employeeImgInput, 
    setEmployeeImgInput,
    isSubmitting
  } = useContext(AdminContext);
  const updatedFormControl = addEmployeeFormControl.map((item) => {
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

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    await addEmployee();
  };

  return (
    <div className="w-full h-screen p-4 overflow-y-scroll">
      <form onSubmit={handleAddEmployee}>
        <FormControl
          formControl={updatedFormControl}
          formData={employeeInputValue}
          setFormData={setEmployeeInputValue}
        />
        <div className="border p-2">
          <Label htmlFor="file">
            <div className="flex flex-col items-center cursor-pointer">
              <img src={employeeImgInput ? URL.createObjectURL(employeeImgInput) : imageAsset.uploadLabel} alt="" className="w-52" />
              {employeeImgInput ? null : <p>Choose File To Upload</p>}
            </div>
          </Label>
          <Input type="file" id="file" className="hidden" onChange={(e) => setEmployeeImgInput(e.target.files[0])}/>
        </div>
        <Button type="submit" className="mt-3" disabled={isSubmitting ? true : false}>
          {isSubmitting ? <><Loader2 className="animate-spin" />
          Please wait</> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
