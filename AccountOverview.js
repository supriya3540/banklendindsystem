import React, { useState } from 'react';
import axios from 'axios';

const AccountOverview = () => {
  const [customerId, setCustomerId] = useState('');
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState('');

  const fetchOverview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/customers/${customerId}/overview`);
      setOverview(response.data);
      setError('');
    } catch (err) {
      setOverview(null);
      setError(`❌ Could not fetch overview: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>👤 Customer Account Overview</h2>
      <form onSubmit={fetchOverview}>
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />
        <button type="submit">Fetch Overview</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {overview && (
        <div style={{ marginTop: '1rem' }}>
          <p><strong>Total Loans:</strong> {overview.total_loans}</p>
          <table border="1" cellPadding="5">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Principal</th>
                <th>Total Amount</th>
                <th>Interest</th>
                <th>EMI</th>
                <th>Amount Paid</th>
                <th>EMIs Left</th>
              </tr>
            </thead>
            <tbody>
              {overview.loans.map((loan) => (
                <tr key={loan.loan_id}>
                  <td>{loan.loan_id}</td>
                  <td>₹{loan.principal}</td>
                  <td>₹{loan.total_amount}</td>
                  <td>₹{loan.total_interest}</td>
                  <td>₹{loan.emi_amount}</td>
                  <td>₹{loan.amount_paid}</td>
                  <td>{loan.emis_left}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AccountOverview;
