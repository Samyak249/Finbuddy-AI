const Income = require('../models/Income');

exports.addIncome = async (req, res) => {
  try {
    const { amount, source } = req.body;
    const newIncome = new Income({
      user: req.user.id,
      amount,
      source,
    });
    const income = await newIncome.save();
    res.json(income);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};