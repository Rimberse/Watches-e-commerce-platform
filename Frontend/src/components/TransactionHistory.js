import React, { useState, useRef } from 'react';
import '../styles/TransactionHistory.css';
import transactionService from '../services/transaction';

// Lets the admin to view number of purchases have been made by each client: Product information, quantity ordered, price, client
const TransactionHistory = ({ user }) => {
    const [transactions, SetTransactions] = useState([]);

    return(
        <>
            <h1 className='Transaction-history-header'>Transaction history</h1>
            { user === "Admin" && <div className='Transaction-history'>
                
            </div>}
        </>
    );
}

export default TransactionHistory;