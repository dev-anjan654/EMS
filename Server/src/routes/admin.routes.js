import express from 'express';
import { addSalary, createDepartment, createEmployee, deleteDepartment, deleteEmployee, editDepartment, editEmployee, getAllEmployee, getAllLeaves, getDepartments, getSalaryRecord, manageLeave } from '../controllers/admin.controller.js';
import upload from '../middleware/multer.js';
import userAuthentication from '../middleware/userAuthentication.js';

const adminRouter = express.Router();

adminRouter.post('/add-department', userAuthentication, createDepartment);
adminRouter.post('/add-employee', upload.single("image"), userAuthentication, createEmployee);
adminRouter.get('/departments', getDepartments);
adminRouter.delete('/delete-department/:id', deleteDepartment);
adminRouter.post('/update-department', editDepartment);
adminRouter.get('/employees', userAuthentication, getAllEmployee);
adminRouter.post('/edit-employee', upload.single("image"), editEmployee);
adminRouter.delete('/delete-employee/:id', deleteEmployee);
adminRouter.post('/add-salary', addSalary);
adminRouter.post('/salary-record', getSalaryRecord);
adminRouter.get('/get-leaves', getAllLeaves);
adminRouter.post('/manage-leave', manageLeave);


export default adminRouter;