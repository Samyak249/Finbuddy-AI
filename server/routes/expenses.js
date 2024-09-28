const express = require('express');
const router = express.Router();
const { addExpense, getExpenses } = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/', auth, addExpense);
router.get('/', auth, getExpenses);

module.exports = router;