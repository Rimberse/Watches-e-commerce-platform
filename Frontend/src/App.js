import React from 'react';
import Watches from './components/Watches';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

const App = () => {
  
  return (
    <div className="App">
      {/* <Watches /> */}
      <TransactionHistory user={"Admin"} />
    </div>
  );
}

export default App;
