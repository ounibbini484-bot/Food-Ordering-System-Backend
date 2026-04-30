import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/food', foodRoutes)


//Testing route
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});