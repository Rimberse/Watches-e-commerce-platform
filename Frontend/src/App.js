import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Watches from './components/Watches';
import Payment from './components/Payment';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

const App = () => {
  const [user, setUser] = useState("Guest");  // Used to grand the admin right to perform CRUD operations
  const [clientID, setClientID] = useState(0); // Used to get clientID from DB, which is used later on when client makes a purchase
  
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
