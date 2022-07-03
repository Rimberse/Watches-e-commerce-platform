import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
<<<<<<< HEAD

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/*" element= {<App />} />
    </Routes>
  </Router>
);
=======
import Payment from './components/Payment';
import Logs from './components/Logs';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/*" element={<App/>}/>
        </Routes>
      </Router>
  </React.StrictMode>
);
>>>>>>> 00af52b1f08b9e37fb9555fb92e9430ea6786012
