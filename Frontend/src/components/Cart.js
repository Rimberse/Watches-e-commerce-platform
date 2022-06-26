import React, { useState, useRef, useEffect } from 'react';
import CartItem from './CartItem';
import "../styles/Cart.css";

const Cart = ({ user, watch, contents }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (watch && Object.keys(watch).length !== 0) {
            addToCart(watch);
        }
    }, [contents]);

    const addToCart = watch => {
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));
        if (index !== -1) {
            const itemsTemp = items;
            itemsTemp[index].quantity++;
            setItems(itemsTemp);
        } else {
            items.push({ watch, quantity: 1 });
            setItems(items.slice());
        }

        console.log(items);
    }

    const removeFromCart = watch => {
        setItems(items.filter(w => w.IdWatches !== watch.IdWatches));
    }

    const increaseQuantity = watch => {
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));
        if (index !== -1) {
            const itemsTemp = items;
            itemsTemp[index].quantity++;
            setItems(itemsTemp);
        }
    }

    const decreaseQuantity = watch => {
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));
        if (index !== -1) {
            const itemsTemp = items;
            itemsTemp[index].quantity--;
            setItems(itemsTemp);
        }
    }

    return(
        <>
            <div className='cart'>
                <ul>
                    { items.map(item => <li key={item.watch.IdWatches}><CartItem item={item} /></li>) }
                </ul>
            </div>
        </>
    );
}

export default Cart;