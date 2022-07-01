import React, { useState, useRef, useEffect } from 'react';
import Card from './Card';
import PageButton from './PageButton';
import WatchForm from './WatchForm';
import Cart from './Cart';
import shopService from '../services/shop';
import '../styles/Watches.css';

const Watches = () => {
    const [watches, setWatches] = useState([]);
    const [page, setPage] = useState(Number(1));
    const lastPage = useRef(0);
    const [cart, setCart] = useState([]);

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

    const addToCart = watch => {
        cart.push(watch);
        setCart(cart.slice());
    }

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
        <div className='store'>
            <WatchForm user={"Admin"} />
            <Cart watch={cart[cart.length - 1]} contents={cart} user={'Client'} userID={1} />
            <ul>
                {watches.map(watch => <li key={watch.IdWatches}><Card watch={watch} user={"Admin"} reflectChanges={refresh} addToCart={() => { console.log(watch); addToCart(watch) } } /></li>)}
            </ul>
        
            <div className="pagination-bar">
                <PageButton page={ '\u2190   Prev' } loadPage={ () => loadPrevPage() } isDisabled={ page > 1 ? false : true } />
                <PageButton page={ 'Next   \u2192' } loadPage={ () => loadNextPage() } isDisabled={ page < lastPage.current ? false : true } />
            </div>
        </div>
    );
}

export default Watches;