import React from 'react';
import Watches from './components/Watches';
import './App.css';
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import Payment from './components/Payment';
import Logs from './components/Logs';

const App = () => {
  
  return (


    <div className="App">
      <div><Navbar></Navbar></div>
      <Routes>
      <Route path='/' element={<Watches /> }/>
        <Route path='/payment' element={<Payment />}/>
        <Route path='/logs' element={<Logs />}/>
      </Routes>
    
      
    </div>

  );
}

export default App;
