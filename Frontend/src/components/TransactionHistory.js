import React, { useState, useEffect } from 'react';
import '../styles/TransactionHistory.css';
import transactionService from '../services/transaction';
import Transaction from './Transaction';
import PageButton from './PageButton';
import Navbar from './Navbar';

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
        if (page <= 1)
            return;
    
        setPage(page - 1);
    }
    
    const loadNextPage = () => {
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
            <Navbar user={user} />
            <h1 className='Transaction-history-header'>Transaction history</h1>
            { user === "Administrator" ? <div className='Transaction-history'>
                <div className='Transaction-history-columns'>
                    <h3 className='Transaction-history-columns-product'>Product name</h3>
                    <h3 className='Transaction-history-columns-client'>Ordered by</h3>
                    <h3 className='Transaction-history-columns-quantity'>Quantity</h3>
                </div>

                <ul className='transaction-list'>
                    { transactions.map(transaction => <li key={ transaction.IdWatches + transaction.IdCustomer } className='transaction-element'><Transaction watch={ retrieveWatch(transaction) } client={ retrieveClient(transaction) } quantity={ transaction.Quantity } /></li>) }
                </ul>

                <div className="pagination-bar">
                    <PageButton page={ '\u2190   Prev' } loadPage={ () => loadPrevPage() } isDisabled={ page > 1 ? false : true } />
                    <PageButton page={ 'Next   \u2192' } loadPage={ () => loadNextPage() } isDisabled={ transactions.length < 10 ? true : false } />
                </div>
            </div>
            : <div className="Transaction-history-no-rights">You Don't have Authorization to View this Page<br></br>Please Log In</div>}
        </>
    );
}

export default TransactionHistory;