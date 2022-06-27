import React, { useState, useRef, useEffect } from 'react';
import CartItem from './CartItem';
import "../styles/Cart.css";

const Cart = ({ user, watch, contents }) => {
    const [items, setItems] = useState([]);
    const [itemQuantity, setItemQuantity] = useState(0);

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
    }

    const emptyCart = () => {
        setItems(items.map(item => item.quantity = 0));
    }

    const increaseQuantity = watch => {
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));

        if (items[index].quantity >= items[index].watch.Stock) {
            return;
        }

        if (index !== -1 && items[index].quantity < items[index].watch.Stock) {
            const itemsTemp = items;
            itemsTemp[index].quantity++;
            setItems(itemsTemp);
            setItemQuantity(itemsTemp[index].quantity);
        }
    }

    const decreaseQuantity = watch => {
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));

        if (items[index].quantity < 1) {
            return;
        }

        if (index !== -1 && items[index].watch.Stock > 0) {
            const itemsTemp = items;
            itemsTemp[index].quantity--;
            setItems(itemsTemp);
            setItemQuantity(itemsTemp[index].quantity);
        }
    }

    // Renders cart items based on cart content. For each cart item renders CartItem component, representing a small piece of information, concering a watch: name, brand, image & price. CartItem component gets rerendered each time quantity changes.
    // Quantity of the items could de increased of decreased using provided button in CartItem. If user tries to decrease quantity beyond 1, cart item gets removed from the cart and no longer displayed (hence why .filter is used before .map function)
    return(
        <>
            <div className='cart'>
                <ul>
                    { items.filter(item => item.quantity > 0).map(item => <li key={item.watch.IdWatches}><CartItem item={item} itemQuantity={itemQuantity} decrease={() => decreaseQuantity(item.watch)} increase={() => increaseQuantity(item.watch)} /></li>) }
                </ul>
            </div>
        </>
    );
}

export default Cart;