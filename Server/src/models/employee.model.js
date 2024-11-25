import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    joiningDate: {type: Date, required: true},
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'department', required: true },
    salary: { type: Number, default: 0 },
    salaryPaid: { type: Boolean, default: false },
    role: { type: String, required: true },
    qualification: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

const employeeModel = mongoose.model('employee', employeeSchema);

export default employeeModel;
