import React, { useState } from 'react';
import axios from 'axios';

const LedgerView = () => {
  const [loanId, setLoanId] = useState('');
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState('');

  const fetchLedger = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/loans/${loanId}/ledger`);
      setLedger(response.data);
      setError('');
    } catch (err) {
      setLedger(null);
      setError(`❌ Could not fetch ledger: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📒 View Loan Ledger</h2>
      <form onSubmit={fetchLedger}>
        <label>Loan ID:</label>
        <input
          type="text"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          required
        />
        <button type="submit">Fetch Ledger</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {ledger && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Loan Details</h3>
          <p><strong>Customer ID:</strong> {ledger.customer_id}</p>
          <p><strong>Principal:</strong> ₹{ledger.principal}</p>
          <p><strong>Total Payable:</strong> ₹{ledger.total_amount}</p>
          <p><strong>Monthly EMI:</strong> ₹{ledger.monthly_emi}</p>
          <p><strong>Amount Paid:</strong> ₹{ledger.amount_paid}</p>
          <p><strong>Balance:</strong> ₹{ledger.balance_amount}</p>
          <p><strong>EMIs Left:</strong> {ledger.emis_left}</p>

          <h4>Transactions</h4>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {ledger.transactions.map((txn) => (
                <tr key={txn.transaction_id}>
                  <td>{txn.transaction_id}</td>
                  <td>{new Date(txn.date).toLocaleString()}</td>
                  <td>₹{txn.amount}</td>
                  <td>{txn.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LedgerView;
