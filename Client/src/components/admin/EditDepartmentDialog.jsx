import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import FormControl from "../comp/FormControl";
import { addDepartmentFormControl } from "@/config";

const EditDepartmentDialog = ({inputValue, setInputValue, isOpen, setIsOpen, onAction}) => {

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>Click Save Changes when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormControl
            formData={inputValue}
            setFormData={setInputValue}
            formControl={addDepartmentFormControl}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onAction}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentDialog;
