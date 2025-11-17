const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.get('/', auth, expenseController.listExpenses);
router.post('/', auth, expenseController.createExpense);

module.exports = router;
