import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;
