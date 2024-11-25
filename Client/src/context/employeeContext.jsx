import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";
import { EqualSquare } from "lucide-react";


export const EmployeeContext = createContext();

const EmployeeContextProvider = ({children}) => {
    const {accessToken, role} = useContext(AuthContext);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [employeeId, setEmployeeId] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [openAddLeaveDialog, setOpenAddLeaveDialog] = useState(false);
    const [leavesRecord, setLeavesRecord] = useState([]);
    const [salaryRecords, setSalaryRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applyLeaveInput, setApplyLeaveInput] = useState({
        type: '',
        fromDate: '',
        toDate: '',
        description: ''
    })

    const [changePasswordInput, setChangePasswordInput] = useState({
        prev_password: '',
        new_password: '',
        cnf_password: ''
    });

    const {toast} = useToast();
    const currentTimestamp = moment().format('dddd, MMMM D, YYYY [at] h:mm A');

    const getUserData = async () => {
        try {
            const {data} = await axios.get(`${BASE_URL}/api/employee/get-user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if(data.success) {
                setEmployeeId(data.user?.employeeId);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getEmployeeData = async () => {
        if (!employeeId) return;

        try {
            const { data } = await axios.post(
                `${BASE_URL}/api/employee/get-employee`, 
                { employeeId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (data.success) {
                setEmployeeData(data.employee);
            }
        } catch (error) {
            console.log('Error fetching employee data:', error);
        }
    };

    const getLeaveRecord = async () => {
        setIsLoading(true);
        try {
            const {data} = await axios.post(`${BASE_URL}/api/employee/get-leaves`, {employeeId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(data.success) {
                setLeavesRecord(data.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const getSalaryRecord = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post(`${BASE_URL}/api/employee/get-salary`, {employeeId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(data.success) {
                setSalaryRecords(data?.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const applyLeave = async () => {
        setIsSubmitting(true);
        const body = {
            type: applyLeaveInput.type,
            fromDate: applyLeaveInput.fromDate,
            toDate: applyLeaveInput.toDate,
            description: applyLeaveInput.description,
            employeeId
        }
        try {
            const {data} = await axios.post(`${BASE_URL}/api/employee/apply-leave`, body, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            if(data.success) {
                toast({
                    title: data.message,
                    description: currentTimestamp
                })
                await getLeaveRecord();
                setOpenAddLeaveDialog(false);
                setIsSubmitting(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimestamp
                })
                setIsSubmitting(false);
            }
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimestamp
            })
            setIsSubmitting(false);
        }
    }

    const changePassword = async () => {
        setIsSubmitting(true);
        const body = {
            role: 'employee',
            employeeId,
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
                    description: currentTimestamp,
                })
                setIsSubmitting(false);
            } else {
                toast({
                    title: data.message,
                    description: currentTimestamp,
                })
                setIsSubmitting(false);
            }
            
        } catch (error) {
            console.log(error);
            toast({
                title: error.message,
                description: currentTimestamp,
            })
            isSubmitting(false);
        }
    }


    useEffect(() => {
        if(accessToken && role === 'employee') {
            getUserData();
        }
    }, [accessToken, role])

    useEffect(() => {
        getEmployeeData();
        getLeaveRecord();
        getSalaryRecord();
    }, [employeeId])


    const value = {
        employeeId,
        employeeData,
        isLoading,
        isSubmitting,
        openAddLeaveDialog, setOpenAddLeaveDialog,
        applyLeaveInput, setApplyLeaveInput,
        applyLeave,
        leavesRecord,
        getLeaveRecord,
        getSalaryRecord,
        salaryRecords,
        changePasswordInput, setChangePasswordInput,
        changePassword
    };

    return (
        <EmployeeContext.Provider value={value}>{children}</EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;