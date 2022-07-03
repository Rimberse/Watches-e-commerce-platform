import React from 'react';
import { Routes, Route } from "react-router-dom";
import Watches from './components/Watches';
import './App.css';
import Payment from './components/Payment';

const App = () => {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/payment' element={<Payment />}/>
        <Route path='/Shop' element={<Watches user={'Guest'} />}/>
      </Routes>
    </div>
  );
}

export default App;
