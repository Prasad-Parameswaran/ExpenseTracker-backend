require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportRoutes = require('./routes/reportRoutes');


const app = express();
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN
    })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
})
    .then(() => console.log("MongoDB Connected......."))
    .catch(err => console.error("Initial connection error:", err));


app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on', PORT));
