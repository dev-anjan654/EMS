import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { Textarea } from "../ui/textarea";


const FormControl = ({ formControl, formData, setFormData }) => {
  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderComponentByType = (item) => {
    let element;
    switch (item.componentType) {
      case "input":
        element = (
          <Input
            type={item.type}
            placeholder={item.placeholder}
            value={formData[item.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
            id={item.name}
            required={item.required}
            name={item.name}
          />
        );
        break;

      case "select":
        element = (
          <Select
            value={formData[item.name]}
            onValueChange={(value) => handleSelectChange(item.name, value)}
            required={item.required}
            name={item.name}
          >
            <SelectTrigger>
              <SelectValue placeholder={item.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {item.options &&
                item.options.map((opt, index) => (
                  <SelectItem key={index} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            value={formData[item.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            type={item.type}
            placeholder={item.placeholder}
            value={formData[item.name] || ""}
            onChange={(e) =>
              setFormData({ ...formData, [item.name]: e.target.value })
            }
            id={item.name}
            required={item.required}
          />
        );
        break;
    }
    return element;
  };

  return (
    <>
      {formControl.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 mb-3">
          <Label htmlFor={item.name}>{item.label}</Label>
          {renderComponentByType(item)}
        </div>
      ))}
    </>
  );
};

export default FormControl;
