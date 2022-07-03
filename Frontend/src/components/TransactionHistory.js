import React, { useState, useRef, useEffect } from 'react';
import '../styles/TransactionHistory.css';
import transactionService from '../services/transaction';
import Transaction from './Transaction';

// Lets the admin to view number of purchases have been made by each client: Product information, quantity ordered, price, client
const TransactionHistory = ({ user }) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(Number(1));

    useEffect(() => {
        transactionService.retrieve(page)
            .then(initialTransactions => {
                setTransactions(initialTransactions.data);
                setPage(Number(initialTransactions.meta.page));
            })
    }, [page]);

    const loadPrevPage = () => {
        console.log("Pressed");
        if (page <= 1)
            return;
    
        setPage(page - 1);
    }
    
    const loadNextPage = () => {
        console.log("Pressed");
        if (transactions.length < 10)
            return;
    
        setPage(page + 1);
    };

    // Retrieves watch related informations from the list of transactions
    const retrieveWatch = transaction => {
        const watch = (({ IdWatches, Name, Type, Price, Brand, Weight, MaterialType, Color, WristSize, DialWatchType, CollectionName, Mechanism, Stock, Image, Description }) => 
              ({ IdWatches, Name, Type, Price, Brand, Weight, MaterialType, Color, WristSize, DialWatchType, CollectionName, Mechanism, Stock, Image, Description }))(transaction);
        
        return watch;
    }

    // Retrieves client related informations from the list of transactions
    const retrieveClient = transaction => {
        const client = (({ IdCustomer, FirstName, LastName, Email }) => 
              ({ IdCustomer, FirstName, LastName, Email }))(transaction);
        
        return client;
    }    

    return(
        <>
            <h1 className='Transaction-history-header'>Transaction history</h1>
            { user === "Admin" && <div className='Transaction-history'>
                <ul>
                    { transactions.map(transaction => <li key={ transaction.IdWatches } className='transaction-element'><Transaction watch={ retrieveWatch(transaction) } client={ retrieveClient(transaction) } quantity={ transaction.Quantity } /></li>) }
                </ul>
            </div>}
        </>
    );
}

export default TransactionHistory;