import express from 'express';
import userAuthentication from '../middleware/userAuthentication.js';
import { applyLeave, getEmployeeData, getLeaveRecords, getSalaryRecord, getUserData } from '../controllers/employee.controller.js';

const employeeRouter = express.Router();

employeeRouter.get('/get-user', userAuthentication, getUserData);
employeeRouter.post('/get-employee', getEmployeeData);
employeeRouter.post('/apply-leave', applyLeave);
employeeRouter.post('/get-leaves', getLeaveRecords);
employeeRouter.post('/get-salary', getSalaryRecord);

export default employeeRouter;