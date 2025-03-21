import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import translateRoutes from './routes/translateRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/translate', translateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
