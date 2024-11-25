import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './src/configs/db.js';
import authRouter from './src/routes/auth.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import connectCloudinary from './src/configs/cloudinary.js';
import employeeRouter from './src/routes/employee.routes.js';


const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Server is running');
})

//endpoints
app.use('/api/user', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/employee', employeeRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})