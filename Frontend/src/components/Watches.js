import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import PageButton from './PageButton';
import WatchForm from './WatchForm';
import shopService from '../services/shop';
import '../styles/Watches.css';

const Watches = () => {
    const [watches, setWatches] = useState([]);
    const [page, setPage] = useState(Number(1));
    const lastPage = useRef(0);

    useEffect(() => {
        shopService
            .getQuantity()
            .then(nbWatches => lastPage.current = Math.ceil(nbWatches.quantity / 10));
    }, []);

    useEffect(() => {
        shopService
            .getAll(page)
            .then(initialWatches => {
                setWatches(initialWatches.data);
                setPage(Number(initialWatches.meta.page));
            })
    }, [page]);

    console.log(lastPage.current);
    console.log(watches);

    const loadPrevPage = () => {
        if (page <= 1)
            return;
    
        setPage(page - 1);
    }
    
    const loadNextPage = () => {
        if (page >= lastPage.current)
            return;
    
        setPage(page + 1);
    };

    const refresh = () => {
        shopService
            .getAll(page)
            .then(watches => {
                setWatches(watches.data);
                setPage(Number(watches.meta.page));
            })
    }
    
    return (
        <>
            <WatchForm user={"Admin"} />
            <ul>
                {watches.map(watch => <li key={watch.IdWatches}><Card watch={watch} user={"Admin"} reflectChanges={refresh} /></li>)}
            </ul>
        
            <div className="pagination-bar">
                <PageButton page={ '\u2190   Prev' } loadPage={ () => loadPrevPage() } isDisabled={ page > 1 ? false : true } />
                <PageButton page={ 'Next   \u2192' } loadPage={ () => loadNextPage() } isDisabled={ page < lastPage.current ? false : true } />
            </div>
        </>
    );
}

export default Watches;