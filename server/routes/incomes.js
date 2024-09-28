const express = require('express');
const router = express.Router();
const { addIncome, getIncomes } = require('../controllers/incomeController');
const auth = require('../middleware/auth');

router.post('/', auth, addIncome);
router.get('/', auth, getIncomes);

module.exports = router;