import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import employeeModel from "../models/employee.model.js";

const createAdmin = async (req, res) => {
    try {
        
        const {email, password, role} = req.body;
        const isAdminExist = await userModel.findOne({email});

        if(isAdminExist) {
            return res.json({success: false, message: 'User alredy exist'});
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            email: email,
            password: hashedPassword,
            role
        }

        const newUser = new userModel(userData);
        await newUser.save();

        return res.json({success: true, message: 'New User Created'});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
    }
}


const loginUser = async (req, res) => {
    try {
        
        const {email, password, role} = req.body;
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: 'Enter Valid Email'});
        }

        if(!role) {
            return res.json({success: false, message: 'Select your role'});
        }
        
        if(!password) {
            return res.json({success: false, message: 'Password is required'});
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched) {
            return res.json({success: false, message: 'Invalid Password'});
        }

        if(role !== user.role) {
            return res.json({success: false, message: 'Role mismatch: Please select the correct role'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({success: true, message: 'Successfully logged in', accessData: {token, role: user.role}});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
    }
}

const changePassword = async (req, res) => {
    try {

        const {userId, employeeId, role, prev_password, new_password, cnf_password} = req.body;

        if(new_password !== cnf_password) {
            return res.json({success: false, message: 'Confirm Password is not matching'});
        }

        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        const isPrevPasswordValid = await bcrypt.compare(prev_password, user.password);

        if(!isPrevPasswordValid) {
            return res.json({success: false, message: 'Previous password is not matching'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(new_password, salt);

        await userModel.findByIdAndUpdate(userId, {password: hashPassword});

        if(role === 'employee') {
            await employeeModel.findByIdAndUpdate(employeeId, {password: hashPassword});
        }

        res.json({success: true, message: 'Password changed successfully'});
        
    } catch (error) {
        console.log(error);
        res.json({success: true, message: error.message || 'An error occured'});
    }
}

export {createAdmin, loginUser, changePassword}