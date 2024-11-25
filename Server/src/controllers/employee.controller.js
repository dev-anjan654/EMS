import userModel from "../models/user.model.js";
import employeeModel from '../models/employee.model.js';
import leaveModel from "../models/leave.model.js";
import salaryModel from "../models/salary.model.js";


const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId).select('-password');
        res.json({success: true, user})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error || 'An error occured'})
    }
}

const getEmployeeData = async (req, res) => {
    try {
        const {employeeId} = req.body;

        if(!employeeId) {
            return res.json({success: false, message: 'Employee not found'})
        }

        const employee = await employeeModel.findById(employeeId).select('-password');

        res.json({success: true, employee})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error || 'An error occured'})
    }
}

const applyLeave = async (req, res) => {
    try {
        const {type, fromDate, toDate, description, employeeId} =req.body;
        if(!type || !fromDate || !toDate || !description || !employeeId) {
            return res.json({success: false, message: 'Missing Details'})
        }
        const leaveDetails = {
            type, fromDate, toDate, description, employeeId, status: 'pending'
        }
        const newLeaveDetails = new leaveModel(leaveDetails);

        await newLeaveDetails.save();

        res.json({success: true, message: 'Successfully Applied'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error || 'An error occured'})
    }
}

const getLeaveRecords = async (req, res) => {
    try {
        const {employeeId} = req.body;
        const leaves = await leaveModel.find({employeeId});
        res.json({success: true, data: leaves})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error || 'An error occured'})
    }
}

const getSalaryRecord = async (req, res) => {
    try {
        const {employeeId} = req.body;
        const salaryDetails = await salaryModel.find({employeeId});
        if(!employeeId) {
            return res.json({success: false, message: 'Employee Not Found'});
        }
        res.json({success: true, data: salaryDetails});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error || 'An error occured'})
    }
}

export {getUserData, getEmployeeData, applyLeave, getLeaveRecords, getSalaryRecord}