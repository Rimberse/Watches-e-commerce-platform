import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Watches from './components/Watches';
import Payment from './components/Payment';
import TransactionHistory from './components/TransactionHistory';
import Home from './components/Home';
import LoginUser from './components/LoginUser';
import ForgotPassword from './components/ForgotPassword';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [user, setUser] = useState("Guest");      // Used to grand the admin right to perform CRUD operations
  const [client, setClient] = useState("Guest");  // Used to get clientID from DB, which is used later on when client makes a purchase
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/LoginUser" element={<LoginUser setRole={setUser} setClient={setClient} />}/>
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/Shop' element={<Watches user={client} />} />
        <Route path='/Transaction-history' element={<TransactionHistory user={'Admin'} />} />
      </Routes>
    </div>
  );
}

export default App;
