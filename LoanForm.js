// src/components/LoanForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    loan_amount: '',
    loan_period_years: '',
    interest_rate_yearly: '',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/v1/loans', formData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to create loan");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Create a Loan</h2>
      <form onSubmit={handleSubmit}>
        <input name="customer_id" placeholder="Customer ID" onChange={handleChange} required /><br />
        <input name="loan_amount" type="number" placeholder="Loan Amount" onChange={handleChange} required /><br />
        <input name="loan_period_years" type="number" placeholder="Loan Period (Years)" onChange={handleChange} required /><br />
        <input name="interest_rate_yearly" type="number" placeholder="Interest Rate (%)" onChange={handleChange} required /><br />
        <button type="submit">Create Loan</button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h4>Loan Created Successfully</h4>
          <p><strong>Loan ID:</strong> {result.loan_id}</p>
          <p><strong>Customer ID:</strong> {result.customer_id}</p>
          <p><strong>Total Amount Payable:</strong> ₹{result.total_amount_payable}</p>
          <p><strong>Monthly EMI:</strong> ₹{result.monthly_emi}</p>
        </div>
      )}
    </div>
  );
};

export default LoanForm;
