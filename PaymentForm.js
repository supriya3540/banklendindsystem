import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [loanId, setLoanId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('EMI');
  const [message, setMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/v1/loans/${loanId}/payments`, {
        amount: parseFloat(amount),
        payment_type: paymentType
      });

      setMessage(`✅ ${response.data.message}. Balance: ₹${response.data.remaining_balance}, EMIs left: ${response.data.emis_left}`);
    } catch (error) {
      setMessage(`❌ Error: ${error.response?.data?.message || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>💸 Record Loan Payment</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Loan ID:</label>
          <input
            type="text"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Payment Type:</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="EMI">EMI</option>
            <option value="LUMP_SUM">LUMP_SUM</option>
          </select>
        </div>
        <button type="submit">Submit Payment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentForm;
