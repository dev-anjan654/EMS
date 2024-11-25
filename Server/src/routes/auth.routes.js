import express from 'express';
import { changePassword, createAdmin, loginUser } from '../controllers/user.controller.js';
import userAuthentication from '../middleware/userAuthentication.js';

const authRouter = express.Router();

authRouter.post('/register-admin', createAdmin);
authRouter.post('/login', loginUser);
authRouter.post('/change-password', userAuthentication, changePassword);

export default authRouter;