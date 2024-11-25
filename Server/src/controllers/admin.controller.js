import departmentModel from "../models/department.model.js";
import bcrypt, { hash } from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import employeeModel from "../models/employee.model.js";
import userModel from "../models/user.model.js";
import salaryModel from "../models/salary.model.js";
import leaveModel from "../models/leave.model.js";

const createDepartment = async (req, res) => {
    try {
        
        const {name, description, userId} = req.body;
        if(!name) {
            return res.json({success: false, message: 'Department name required'});
        }
        const isDepartmentExist = await departmentModel.findOne({name});

        if(isDepartmentExist) {
            return res.json({success: false, message: 'Department name is already added'})
        }
        const department = {userId, name, description};
        const newDepartment = new departmentModel(department);

        await newDepartment.save();

        res.json({success: true, message: 'Successfully Added'});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const getDepartments = async (req, res) => {
    try {

        const departments = await departmentModel.find({});

        res.json({success: true, data: departments});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        
        const { id } = req.params;
        if(!id) {
            return res.json({success: false, message: 'Department ID is required'});
        }
        await departmentModel.deleteOne({_id: id});
        res.json({success: true, message: 'Successfully Deleted'});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const editDepartment = async (req, res) => {
    try {
        
        const {id, name, description} = req.body;
        if(!id) {
            return res.json({success: false, message: 'Department ID is required'});
        }
        await departmentModel.findByIdAndUpdate(id, {name: name, description: description})

        res.json({success: true, message: 'Successfully Updated'});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const createEmployee = async (req, res) => {
    try {
        
        const {name, userId, email, password, cnf_password, dob, joiningDate, gender, phone, departmentId, salary, designation, address, qualification} = req.body;
        const image = req.file;

        // Check if required fields are missing
        if(!name || !email || !password || !cnf_password || !dob || !joiningDate || !salary || !gender || !phone || !departmentId || !designation || !address || !qualification) {
            return res.json({success: false, message: 'Missing details'});
        }

        // Check if employee already exists
        const isEmployeeExist = await employeeModel.findOne({email});
        if(isEmployeeExist) {
            return res.json({success: false, message: 'The employee is already added'});
        }

        // Check if email is valid
        if(!email.includes('@')) {
            return res.json({success: false, message: 'Invalid Email'});
        }

        // Check if passwords match
        if(password !== cnf_password) {
            return res.json({success: false, message: 'Password is not matching'});
        }

        // Check if phone number is valid
        if(phone.length !== 10) {
            return res.json({success: false, message: 'Invalid Phone Number'});
        }

        // Check if the department exists
        const departmentExist = await departmentModel.findById(departmentId);
        if (!departmentExist) {
          return res.json({ success: false, message: 'Department not found' });
        }
        
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        let imageUrl = ''
        if(image) {
            const imageUpload = await cloudinary.uploader.upload(image.path, {resource_type: "image"});
            imageUrl = imageUpload.secure_url;
        }

        // Create the employee data
        const employee = {
            userId,
            name,
            email,
            password: hashedPassword,
            dob,
            joiningDate,
            gender,
            phone,
            department: departmentId,
            designation,
            salary,
            address,
            qualification,
            role: 'employee',
            image: imageUrl
        };

        // Create the employee record in the employeeModel
        const newEmployee = new employeeModel(employee);
        const savedEmployee = await newEmployee.save();

        // Prepare user data
        const userData = {
            employeeId: savedEmployee._id,
            email: email,
            password: hashedPassword,
            role: 'employee',
        };

        // Create the user record in the userModel
        const newUser = new userModel(userData);

        // Save the user
        await newUser.save();

        res.json({success: true, message: 'Successfully Added'});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}


const getAllEmployee = async (req, res) => {
    try {
        
        const {userId} = req.body;
        const employees = await employeeModel.find({userId}).select('-password');

        res.json({success: true, employees})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const editEmployee = async (req, res) => {
    try {
        
        const { id, name, email, joiningDate, dob, gender, phone, departmentId, designation, salary, address, qualification } = req.body;
        const image = req.file;

        // Ensure ID is provided
        if (!id) {
            return res.json({ success: false, message: 'Employee ID is required' });
        }

        // Find the employee to retrieve the current image URL
        const employee = await employeeModel.findById(id);
        if (!employee) {
            return res.json({ success: false, message: 'Employee not found' });
        }

        

        // Delete the previous image from Cloudinary if a new image is uploaded
        if (image && employee.image) {
            const publicId = employee.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        // Prepare the data to be updated
        const updatedEmployeeData = {
            name,
            email,
            dob,
            joiningDate,
            gender,
            phone,
            department: departmentId,
            designation,
            salary,
            address,
            qualification
        };

        // If a new image is uploaded, upload it to Cloudinary
        if (image) {
            const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
            updatedEmployeeData.image = imageUpload.secure_url;
        }

        // Update the employee details
        await employeeModel.findByIdAndUpdate(id, updatedEmployeeData, { new: true });

        if(employee.email !== email) {
            await userModel.updateOne({employeeId: employee._id}, {email});
        }

        // Return success response
        res.json({ success: true, message: 'Employee details updated successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        
        const {id} = req.params;
        console.log(id)
        await employeeModel.findByIdAndDelete(id);
        await userModel.deleteOne({employeeId: id});
        res.json({success: true, message: 'Successfully Deleted'});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const addSalary = async (req, res) => {
    try {
        
        const {employee, department, salary, payDate} = req.body;

        if(!employee || !department || !salary || !payDate) {
            return res.json({success: false, message: 'Missing Details'});
        }

        // Get the current month and year to check if salary is already paid for this month
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // Check if a salary has already been paid for this employee in the current month and year
        const existingSalary = await salaryModel.findOne({
            employeeId: employee,
            payDate: {
                $gte: new Date(currentYear, currentMonth, 1),
                $lt: new Date(currentYear, currentMonth + 1, 0)
            }
        });

        if (existingSalary) {
            return res.json({
                success: false,
                message: 'Employee salary already paid for this month.'
            });
        }

        await employeeModel.findByIdAndUpdate(employee, {salaryPaid: true});
        const salaryData = {
            employeeId: employee,
            departmentId: department,
            salary,
            payDate
        }

        const newSalary = new salaryModel(salaryData);
        await newSalary.save();

        res.json({success: true, message: 'Salary Added'});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const getSalaryRecord = async (req, res) => {
    try {
        
        const {employeeId} = req.body;
        const salaryDetailsOfAnEmployee = await salaryModel.find({employeeId});
        if(!employeeId) {
            return res.json({success: false, message: 'Employee not found'});
        }
        res.json({success: true, data: salaryDetailsOfAnEmployee});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await leaveModel.find({});
        res.json({success: true, data: leaves})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message || 'An error occurred' });
    }
}

const manageLeave = async (req, res) => {
    try {
        const {status, id} = req.body;

        if(!id) {
            return res.json({success: false, message: 'Leave not found'});
        }
        const validStatuses = ['approved', 'rejected', 'pending'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid Request' });
        }

        await leaveModel.findByIdAndUpdate(id, {status});

        if(status === 'approved') {
            return res.json({success: true, message: 'successfully Approved'});
        }
        if(status === 'rejected') {
            return res.json({success: true, message: 'Successfully rejected'})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message || 'An error occurred'});
    }
}


export {createDepartment, createEmployee, getDepartments, deleteDepartment, editDepartment, getAllEmployee, editEmployee, deleteEmployee, addSalary, getSalaryRecord, getAllLeaves, manageLeave}