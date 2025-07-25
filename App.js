import React from 'react';
import LoanForm from './components/LoanForm';
import PaymentForm from './components/PaymentForm';
import LedgerView from './components/LedgerView';
import AccountOverview from './components/AccountOverview';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏦 Bank Loan Management</h1>
      <LoanForm />
      <hr />
      <PaymentForm />
      <hr />
      <LedgerView />
      <hr />
      <AccountOverview />
    </div>
  );
}

export default App;
