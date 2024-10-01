require('dotenv').config();
const Expense = require('./models/Expense'); 
const Income = require('./models/Income');


const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');
const incomeRoutes = require('./routes/incomes');
const { getInsights } = require('./services/insightService');
const auth = require('./middleware/auth');


const app = express();

connectDB();

app.use(express.json({ extended: false }));


app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/incomes', incomeRoutes);

app.get('/api/insights', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    const incomes = await Income.find({ user: req.user.id });
    const insights = await getInsights(expenses, incomes);
    res.json({ insights });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = app;
