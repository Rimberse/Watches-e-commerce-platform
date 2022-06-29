import React from 'react';
import Watches from './components/Watches';
import './App.css';
import Navbar from './components/Navbar/Navbar'

const App = () => {
  
  return (

    <body>
    <div>
    <Navbar></Navbar>
    </div>
    
    <div className="App">
      <Watches />
    </div>
    </body>
  );
}

export default App;
