import React from 'react'
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
import { applyLeaveFormControl } from '@/config';

const AddEmployeeDialog = ({inputValue, setInputValue, isOpen, setIsOpen, onAction}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply Leave</DialogTitle>
          <DialogDescription>Click apply when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-1 py-4">
          <FormControl
            formData={inputValue}
            setFormData={setInputValue}
            formControl={applyLeaveFormControl}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onAction}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddEmployeeDialog