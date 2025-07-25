const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// LEND: Create new loan
router.post('/', loanController.createLoan);

// PAYMENT: Record payment
router.post('/:loan_id/payments', loanController.recordPayment);

// LEDGER: View loan ledger
router.get('/:loan_id/ledger', loanController.getLedger);

module.exports = router;
