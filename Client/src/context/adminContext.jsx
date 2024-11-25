import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";


export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {
    const [isOpenAddDeptDialog, setIsOpenAddDeptDialog] = useState(false);
    const [isOpenEditDeptDialog, setIsOpenEditDeptDialog] = useState(false);
    const [inputDeptValue, setInputDeptValue] = useState({
        name: "",
        description: "",
    });
    const [inputUpdatedDeptValue, setInputUpdatedDeptValue] = useState({
        name: "",
        description: "",
    });
    const [employeeInputValue, setEmployeeInputValue] = useState({
        name: '',
        email: '',
        password: '',
        cnf_password: '',
        dob: '',
        joiningDate: '',
        gender: '',
        phone: '',
        designation: '',
        department: '',
        salary: '',
        address: '',
        qualification: '',
    })
    const [employeeUpdateInputValue, setEmployeeUpdateInputValue] = useState({
        name: '',
        email: '',
        password: '',
        cnf_password: '',
        dob: '',
        joiningDate: '',
        gender: '',
        phone: '',
        designation: '',
        department: '',
        salary: '',
        address: '',
        qualification: '',
    });
    const [addSalaryInputValue, setAddSalaryInputValue] = useState({
        department: "",
        employee: "",
        salary: "",
        payDate: "",
    });
    const [changePasswordInput, setChangePasswordInput] = useState({
        prev_password: '',
        new_password: '',
        cnf_password: ''
    });
    const [employeeImgInput, setEmployeeImgInput] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [salaryRecord, setSalaryRecord] = useState([]);
    const [allLeaveData, setAllLeaveData] = useState([]);

    const {accessToken, role} = useContext(AuthContext);
    const {toast} = useToast();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const currentTimeStamp = moment().format('dddd, MMMM D, YYYY [at] h:mm A');

    const addDepartment = async () => {
        try {
           const {data} = await axios.post(`${BASE_URL}/api/admin/add-department`, {name: inputDeptValue.name, description: inputDeptValue.description}, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
           }) 
           if(data.success) {
            toast({
                title: data.message,
                description: currentTimeStamp
            })
            getAllDepartment();
            setIsOpenAddDeptDialog(false);

           } else {
            toast({
                title: data.message,
                description: currentTimeStamp
            })
           }
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
        }
    }

    const getAllDepartment = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${BASE_URL}/api/admin/departments`)

            if(data.success) {
                setDepartments(data.data);
                setIsLoading(false);
            }
             
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const deleteDepartment = async () => {
        if (!departmentId) return;
    
        try {
          const { data } = await axios.delete(`${BASE_URL}/api/admin/delete-department/${departmentId}`);
    
          if (data.success) {
            toast({
              title: data.message,
              description: currentTimeStamp
            })
            await getAllDepartment();
            setShowAlert(false);
          } else {
            toast({
              title: data.message,
              description: currentTimeStamp
            });
          }
        } catch (error) {
          console.log(error);
          toast({
            title: error.message,
            description: currentTimeStamp
          })
        }
    }

    const editDepartment = async () => {
        try {
            const body = {id: departmentId, name: inputUpdatedDeptValue.name, description: inputUpdatedDeptValue.description}
            const {data} = await axios.post(`${BASE_URL}/api/admin/update-department`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.success) {
                toast({
                  title: data.message,
                  description: currentTimeStamp
                })
                await getAllDepartment();
                setShowAlert(false);
                setIsOpenEditDeptDialog(false);
            } else {
                toast({
                  title: data.message,
                  description: currentTimeStamp
                });
            }

        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
        }
    }

    const addEmployee = async () => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('name', employeeInputValue.name);
        formData.append('email', employeeInputValue.email);
        formData.append('password', employeeInputValue.password);
        formData.append('cnf_password', employeeInputValue.cnf_password);
        formData.append('dob', employeeInputValue.dob);
        formData.append('joiningDate', employeeInputValue.joiningDate);
        formData.append('gender', employeeInputValue.gender);
        formData.append('phone', employeeInputValue.phone);
        formData.append('departmentId', employeeInputValue.department);
        formData.append('designation', employeeInputValue.designation);
        formData.append('salary', employeeInputValue.salary);
        formData.append('address', employeeInputValue.address);
        formData.append('qualification', employeeInputValue.qualification);
        formData.append('image', employeeImgInput);
        try {
            
            const {data} = await axios.post(`${BASE_URL}/api/admin/add-employee`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(data.success) {
                //reset form if submit successsfull
                setEmployeeInputValue({
                    name: '',
                    email: '',
                    password: '',
                    cnf_password: '',
                    gender: '',
                    dob: '',
                    joiningDate: '',
                    phone: '',
                    designation: '',
                    department: '',
                    salary: '',
                    address: '',
                    qualification: '',
                })
                setEmployeeImgInput(false);

                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                setIsSubmitting(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                setIsSubmitting(false);
            }

        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
            setIsSubmitting(false);
        }
    }

    const getAllEmployee = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.get(`${BASE_URL}/api/admin/employees`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if(data.success) {
                setEmployees(data.employees);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const editEmployee = async () => {
        setIsSubmitting(true);

        const formData = new FormData;
        formData.append('name', employeeUpdateInputValue.name);
        formData.append('id', employeeId);
        formData.append('email', employeeUpdateInputValue.email);
        formData.append('dob', employeeUpdateInputValue.dob);
        formData.append('joiningDate', employeeUpdateInputValue.joiningDate);
        formData.append('gender', employeeUpdateInputValue.gender);
        formData.append('phone', employeeUpdateInputValue.phone);
        formData.append('departmentId', employeeUpdateInputValue.department);
        formData.append('designation', employeeUpdateInputValue.designation);
        formData.append('salary', employeeUpdateInputValue.salary);
        formData.append('address', employeeUpdateInputValue.address);
        formData.append('qualification', employeeUpdateInputValue.qualification);
        formData.append('image', employeeImgInput);

        try {
            const {data} = await axios.post(`${BASE_URL}/api/admin/edit-employee`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            if(data.success) {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                setIsSubmitting(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                setIsSubmitting(false);
            }
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
            setIsSubmitting(false);
        }
    }

    const deleteEmployee = async () => {
        try {
            const {data} = await axios.delete(`${BASE_URL}/api/admin/delete-employee/${employeeId}`);
            if(data.success) {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                getAllEmployee();
                setShowAlert(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
            }
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
        }
    }

    const addSalary = async () => {
        setIsSubmitting(true);
        try {
            const body = {
                department: addSalaryInputValue.department,
                employee: addSalaryInputValue.employee,
                salary: addSalaryInputValue.salary,
                payDate: addSalaryInputValue.payDate
            };
            const {data} = await axios.post(`${BASE_URL}/api/admin/add-salary`, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(data.success) {
                setAddSalaryInputValue({
                    department: '',
                    employee: '',
                    salary: '',
                    payDate: '',
                })
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                setIsSubmitting(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                setIsSubmitting(false);
            }

        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
            setIsSubmitting(false);
        }
    }

    const getSalaryRecord = async (id) => {
        setIsLoading(true);
        try {
            const {data} = await axios.post(`${BASE_URL}/api/admin/salary-record`, {employeeId: id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(data.success) {
                setSalaryRecord(data.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const getAllLeaves = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.get(`${BASE_URL}/api/admin/get-leaves`);
            if(data.success) {
                setAllLeaveData(data?.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const manageLeave = async (id, status) => {
        try {
            const {data} = await axios.post(`${BASE_URL}/api/admin/manage-leave`, {id, status}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(data?.success) {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
                await getAllLeaves();
            } else {
                toast({
                    title: data.message,
                    description: currentTimeStamp
                })
            }
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp
            })
        }
    }

    const changePassword = async () => {
        setIsSubmitting(true);
        const body = {
            role: 'admin',
            prev_password: changePasswordInput.prev_password,
            new_password: changePasswordInput.new_password,
            cnf_password: changePasswordInput.cnf_password,
        }
        try {

            const {data} = await axios.post(`${BASE_URL}/api/user/change-password`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(data.success) {
                setChangePasswordInput({
                    new_password: '',
                    prev_password: '',
                    cnf_password: ''
                })
                toast({
                    title: data.message,
                    description: currentTimeStamp,
                })
                setIsSubmitting(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimeStamp,
                })
                setIsSubmitting(false);
            }
            
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimeStamp,
            })
            isSubmitting(false);
        }
    }


    useEffect(() => {
        if(accessToken &&  role === 'admin') {
            getAllEmployee();
        } else {
            setEmployees(null);    
        }
    }, [accessToken, role])

    useEffect(() => {
        if(accessToken) {
            getAllDepartment();
            getAllLeaves();
        } else {
            setDepartments(null);
            setAllLeaveData([]);
        }
    }, [accessToken])

    //initialize updated value
    useEffect(() => {
        const updatedDepartment = departments?.find(item => item._id === departmentId);
        
        setInputUpdatedDeptValue({
            name: updatedDepartment?.name,
            description: updatedDepartment?.description
        })
    }, [isOpenEditDeptDialog])

    useEffect(() => {
        const updatedEmployee = employees?.find(item => item._id == employeeId);
        
        setEmployeeUpdateInputValue({
            name: updatedEmployee?.name,
            email: updatedEmployee?.email,
            password: updatedEmployee?.password,
            cnf_password: updatedEmployee?.cnf_password,
            dob: moment(updatedEmployee?.dob).format("YYYY-MM-DD"),
            joiningDate: moment(updatedEmployee?.joiningDate).format('YYYY-MM-DD'),
            gender: updatedEmployee?.gender,
            phone: updatedEmployee?.phone,
            designation: updatedEmployee?.designation,
            department: updatedEmployee?.department,
            salary: updatedEmployee?.salary,
            address: updatedEmployee?.address,
            qualification: updatedEmployee?.qualification,
        })
    }, [employeeId])

    const value = {
        BASE_URL,
        showAlert, setShowAlert,
        isOpenAddDeptDialog, setIsOpenAddDeptDialog,
        isOpenEditDeptDialog, setIsOpenEditDeptDialog,
        inputDeptValue, setInputDeptValue,
        inputUpdatedDeptValue, setInputUpdatedDeptValue,
        employeeInputValue, setEmployeeInputValue,
        employeeImgInput, setEmployeeImgInput,
        isLoading, setIsLoading,
        isSubmitting, setIsSubmitting,
        currentTimeStamp,
        addDepartment,
        getAllDepartment,
        departments,
        departmentId, setDepartmentId,
        deleteDepartment,
        editDepartment,
        addEmployee,
        getAllEmployee,
        employees,
        setEmployeeId,
        employeeUpdateInputValue, setEmployeeUpdateInputValue,
        editEmployee,
        deleteEmployee,
        addSalaryInputValue, setAddSalaryInputValue,
        addSalary,
        salaryRecord,
        getSalaryRecord,
        getAllLeaves,
        allLeaveData,
        manageLeave,
        changePasswordInput, setChangePasswordInput,
        changePassword
    }

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    )
}

export default AdminContextProvider;