import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: {type: mongoose.Types.ObjectId, ref: 'employee', required: true},
    type: {type: String, required: true},
    fromDate: {type: Date, required: true},
    toDate: {type: Date, required: true},
    description: {type: String, required: true},
    status: {type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'],}
}, {timestamps: true})

const leaveModel = mongoose.model('leave', leaveSchema);

export default leaveModel;