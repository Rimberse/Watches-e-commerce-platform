import React from 'react';
import { Routes, Route } from "react-router-dom";
import Watches from './components/Watches';
import Payment from './components/Payment';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

const App = () => {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/payment' element={<Payment />}/>
        <Route path='/Shop' element={<Watches user={'Guest'} />}/>
        <Route path='/Transaction-history' element={<TransactionHistory user={'Admin'} />}/>
      </Routes>
    </div>
  );
}

export default App;
