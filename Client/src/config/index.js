import { imageAsset } from "@/assets/assets";
import { icons } from "@/assets/assets";


//sidebar data
export const adminRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: icons.home,
  },
  {
    path: "/admin/employee",
    name: "Employees",
    icon: icons.users,
  },
  {
    path: "/admin/departments",
    name: "Departments",
    icon: icons.department,
  },
  {
    path: "/admin/leaves",
    name: "Leaves",
    icon: icons.event,
  },
  {
    path: "/admin/salary",
    name: "Salary",
    icon: icons.money,
  },
  {
    path: "/admin/settings",
    name: "Setting",
    icon: icons.setting,
  },
];

export const employeeRoutes = [
  {
    path: "/employee/dashboard",
    name: "Dashboard",
    icon: icons.home,
  },
  {
    path: "/employee/my-profile",
    name: "My Profile",
    icon: icons.profile,
  },
  {
    path: "/employee/leave",
    name: "Leave",
    icon: icons.event,
  },
  {
    path: "/employee/salary",
    name: "Salary",
    icon: icons.money,
  },
  {
    path: "/employee/settings",
    name: "Setting",
    icon: icons.setting,
  },
]


//form data
export const employeeData = [
    {
      id: 1,
      image: imageAsset.employeeAvatar,
      dob: "11/02/1980",
      name: "Arman Jain",
    },
    {
      id: 2,
      image: imageAsset.employeeAvatar,
      dob: "02/15/1990",
      name: "Sophia Lee",
    },
    {
      id: 3,
      image: imageAsset.employeeAvatar,
      dob: "07/22/1985",
      name: "John Doe",
    },
    {
      id: 4,
      image: imageAsset.employeeAvatar,
      dob: "05/18/1992",
      name: "Emily Davis",
    },
    {
      id: 5,
      image: imageAsset.employeeAvatar,
      dob: "01/12/1984",
      name: "David Smith",
    },
    {
      id: 6,
      image: imageAsset.employeeAvatar,
      dob: "09/09/1987",
      name: "Isabella Brown",
    },
    {
      id: 7,
      image: imageAsset.employeeAvatar,
      dob: "03/25/1989",
      name: "Michael Johnson",
    },
    {
      id: 8,
      image: imageAsset.employeeAvatar,
      dob: "08/03/1993",
      name: "Olivia Wilson",
    },
    {
      id: 9,
      image: imageAsset.employeeAvatar,
      dob: "11/17/1982",
      name: "James Anderson",
    },
    {
      id: 10,
      image: imageAsset.employeeAvatar,
      dob: "12/05/1991",
      name: "Ava Thomas",
    },
  ];

export const departmentOptions = ['IT', 'Logstic', 'Sale', 'Telecaller', 'Human Resourse', 'Marketting', 'Reserch'];

const employees = employeeData.map((item => item.name));



export const addSalaryFormControl = [
  {
    name: "department",
    label: "Department",
    componentType: "select",
    type: "text",
    placeholder: "Select Department",
    required: true,
  },
  {
    name: "employee",
    label: "Employee",
    componentType: "select",
    type: "text",
    placeholder: "Select Employee",
    required: true,
  },
  {
    name: "salary",
    label: "Salary",
    componentType: "input",
    type: "number",
    placeholder: "Salary",
    required: true,
  },
  {
    name: "payDate",
    label: "Pay Date",
    componentType: "input",
    type: "date",
    placeholder: "Pay Date",
    required: true,
  },
];

export const loginFormControl = [
  {
    name: "email",
    label: "Email",
    componentType: "input",
    type: "email",
    placeholder: "Enter Email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    type: "password",
    placeholder: "Enter Password",
    required: true,
  },
] 

export const addDepartmentFormControl = [
  {
    name: "name",
    label: "Department Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter Dept. Name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Write Something",
    required: false,
  }
]

export const addEmployeeFormControl = [
  {
    name: "name",
    label: "Employee Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter Employee Name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    componentType: "input",
    type: "email",
    placeholder: "Enter Employee Email",
    required: true,
  },
  {
    name: "dob",
    label: "Date of birth",
    componentType: "input",
    type: "date",
    placeholder: "Date of Birth",
    required: true,
  },
  {
    name: "joiningDate",
    label: "Date of Joining",
    componentType: "input",
    type: "date",
    placeholder: "Date of Joining",
    required: true,
  },
  {
    name: "gender",
    label: "Select Gender",
    componentType: "select",
    type: "text",
    placeholder: "Select Gender",
    options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}],
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    componentType: "input",
    type: "number",
    placeholder: "Enter Phone Number",
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    componentType: "input",
    type: "text",
    placeholder: "Designation",
    required: true,
  },
  {
    name: "department",
    label: "Select Department",
    componentType: "select",
    type: "text",
    placeholder: "Select Department",
    required: true,
  },
  {
    name: "salary",
    label: "Salary",
    componentType: "input",
    type: "number",
    placeholder: "Enter Employee Salary",
    required: true,
  },
  {
    name: "address",
    label: "Employee Address",
    componentType: "input",
    type: "text",
    placeholder: "Enter Employee Address",
    required: true,
  },
  {
    name: "qualification",
    label: "Employee Qualification",
    componentType: "input",
    type: "text",
    placeholder: "Enter Employee Qualification",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    type: "password",
    placeholder: "Enter Password",
    required: true,
  },
  {
    name: "cnf_password",
    label: "Confirm Password",
    componentType: "input",
    type: "password",
    placeholder: "Enter Confirm Password",
    required: true,
  },
]

export const applyLeaveFormControl = [
  {
    name: "type",
    label: "Type of Leave",
    componentType: "input",
    type: "text",
    placeholder: "Type of leave",
    required: true,
  },
  {
    name: "fromDate",
    label: "From Date",
    componentType: "input",
    type: "date",
    placeholder: "",
    required: true,
  },
  {
    name: "toDate",
    label: "To Date",
    componentType: "input",
    type: "date",
    placeholder: "",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Short Description",
    required: false,
  },
]

export const changePasswordFormControl = [
  {
    name: "prev_password",
    label: "Previous Password",
    componentType: "input",
    type: "password",
    placeholder: "Previous Password",
    required: true,
  },
  {
    name: "new_password",
    label: "New Password",
    componentType: "input",
    type: "password",
    placeholder: "New Password",
    required: true,
  },
  {
    name: "cnf_password",
    label: "Confirm Password",
    componentType: "input",
    type: "password",
    placeholder: "Confirm Password",
    required: true,
  },
]