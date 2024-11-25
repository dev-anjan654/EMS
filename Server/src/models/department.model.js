import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    name: {type: String, required: true},
    description: {type: String}
})

const departmentModel = mongoose.model('department', departmentSchema);

export default departmentModel;