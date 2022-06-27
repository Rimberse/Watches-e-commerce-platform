import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import "../styles/Cart.css";

const Cart = ({ user, watch, contents }) => {
    // Cart contents
    const [items, setItems] = useState([]);
    // Cart item quantity
    const [itemQuantity, setItemQuantity] = useState(0);

    // Re-render the components each time the cart's contents changes
    useEffect(() => {
        if (watch && Object.keys(watch).length !== 0) {
            addToCart(watch);
        }
    }, [contents]);

    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    });

    const addToCart = watch => {
        // Find item index by it's id
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));
        // If item has already been added to cart, increase it's quantity
        if (index !== -1) {
            const itemsTemp = items;
            itemsTemp[index].quantity++;
            setItems(itemsTemp);
            setItemQuantity(itemsTemp[index].quantity);
        // else display new item in cart with it's quantity set to 1
        } else {
            items.push({ watch, quantity: 1 });
            setItems(items.slice());
        }
    }

    const emptyCart = () => {
        // Do nothing is cart is empty
        if (items.filter(item => item.quantity > 0).length === 0) {
            return;
        }

        // Replace items array with the exact same contents, but quantity of items set to zero
        setItems(items.map(item => {
            const watch = item.watch;
            const quantity = 0;
            return { watch, quantity }
        }));
        setItems([]);
    }

    const increaseQuantity = watch => {
        // Find index of the item
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));

        // If stock limit is reached, do nothing
        if (items[index].quantity >= items[index].watch.Stock) {
            return;
        }

        // If item is found, increase it's quantity while respecting it's stock limits
        if (index !== -1 && items[index].quantity < items[index].watch.Stock) {
            const itemsTemp = items;
            itemsTemp[index].quantity++;
            setItems(itemsTemp);
            setItemQuantity(itemsTemp[index].quantity);
        }
    }

    const decreaseQuantity = watch => {
        // Find index of the item
        const index = (items.map(item => item.watch.IdWatches).indexOf(watch.IdWatches));

        // If minimum quantity limit is reached, do nothing
        if (items[index].quantity < 1) {
            return;
        }

        // If item is found, decrease it's quantity while respecting it's minimum quantity limit
        if (index !== -1 && items[index].watch.Stock > 0) {
            const itemsTemp = items;
            itemsTemp[index].quantity--;
            setItems(itemsTemp);
            setItemQuantity(itemsTemp[index].quantity);
        }
    }

    const calculateTotal = () => {
        let total = 0;
        // Calculate total for each item by multiplying it's price times quantity of items in cart
        items.forEach(item => total += item.quantity * item.watch.Price);
        // Format the price, to be displayed in a proper manner
        return formatter.format(total);
    }

    // Renders cart items based on cart content. For each cart item renders CartItem component, representing a small piece of information, concering a watch: name, brand, image & price. CartItem component gets rerendered each time quantity changes.
    // Quantity of the items could de increased of decreased using provided button in CartItem. If user tries to decrease quantity beyond 1, cart item gets removed from the cart and no longer displayed (hence why .filter is used before .map function)
    return(
        <>
            <div className='cart'>
                <div className='cart-contents'>
                    <ul>
                        { items.filter(item => item.quantity > 0).map(item => <li key={item.watch.IdWatches}><CartItem item={item} itemQuantity={itemQuantity} decrease={() => decreaseQuantity(item.watch)} increase={() => increaseQuantity(item.watch)} /></li>) }
                    </ul>
                </div>
                <div className='cart-operations'>
                    <button className='cart-operations-empty' onClick={emptyCart}>Empty Cart</button>
                    <span className='cart-operations-total'>{ calculateTotal() }</span>
                </div>
            </div>
        </>
    );
}

export default Cart;