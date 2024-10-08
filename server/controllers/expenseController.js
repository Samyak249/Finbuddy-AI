const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const newExpense = new Expense({
      user: req.user.id,
      amount,
      category,
      description,
    });
    const expense = await newExpense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};