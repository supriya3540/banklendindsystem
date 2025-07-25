import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // backend base URL
});

// Usage
API.post('/loans', loanData); // calls http://localhost:3001/api/v1/loans
API.post('customers',customerData);
