import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import connectDB from './config/db.js';
import AuthRoutes from './routes/auth.js'
connectDB();

const app = express()
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/api/auth',AuthRoutes);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server running on ${port}`);
});