import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    employeeId: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
    departmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'department'},
    salary: {type: Number, default: 0, required: true},
    payDate: {type: Date, required: true} 
})

const salaryModel = mongoose.model('salary', salarySchema);

export default salaryModel;