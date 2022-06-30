import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Payment from './components/Payment/Payment';
import Logs from './components/Logs/Logs';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
      <Routes>
      <Route path='/' element={<App />}/>
        <Route path='/payment' element={<Payment />}/>
        <Route path='/logs' element={<Logs />}/>
      </Routes>
      </Router>
  </React.StrictMode>
);