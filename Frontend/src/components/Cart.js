import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import "../styles/Cart.css";
import { AiOutlineShopping } from 'react-icons/ai';
import transaction from '../services/transaction';
import Payment from './Payment';


const Cart = ({ user, userID, watch, contents }) => {
    // Cart contents
    const [items, setItems] = useState([]);
    // Cart item quantity
    const [itemQuantity, setItemQuantity] = useState(0);
    // Controls cart's visibility (if it's displayed or not)
    const [displayCart, setDisplayCart] = useState(false);
    // An alert indicating whether the purchase has been made successfully
    const [message, setMessage] = useState('');

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

    // Adds item to cart
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

    // Empties cart
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

    // Inrrease item quantity in cart
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

    // Decrease item quantity in cart
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

    // Used to calculate total price of cart contents
    const calculateTotal = () => {
        let total = 0;
        // Calculate total for each item by multiplying it's price times quantity of items in cart
        items.forEach(item => total += item.quantity * item.watch.Price);
        // Format the price, to be displayed in a proper manner
        return formatter.format(total);
    }

    // Toggles on/off cart contents with it's total price
    const changeCartVisibility = () => setDisplayCart(!displayCart);

    // Used to finalize the purchase. Used to store transaction information to db
    const checkout = () => {
        // No checkout if cart is empty
        if (items.filter(item => item.quantity > 0).length <= 0) {
            return ;
        }
    
        // Otherwise, redirect the client to payment page (via Paypal) & store the transaction informations to db if payment has been made successfully
        const transactionInfo = {
            transactions: []
        };
        
        // Store information about each item in cart
        items.filter(item => item.quantity > 0).forEach(item => {
            const transaction = {
                CustomerId: userID,
                WatchesId: item.watch.IdWatches,
                quantity: item.quantity
            };

            transactionInfo.transactions.push(transaction);
        })

        // Once the transaction has been made, empty the cart, display an alert and close the cart
        transaction.store(transactionInfo)
            .then(response => {
                emptyCart();
                setDisplayCart(!displayCart);
                setMessage(response.message);
                setTimeout(() => setMessage(''), 3000);
            });

    }

   

    // Renders cart items based on cart content. For each cart item renders CartItem component, representing a small piece of information, concering a watch: name, brand, image & price. CartItem component gets rerendered each time quantity changes.
    // Quantity of the items could de increased of decreased using provided button in CartItem. If user tries to decrease quantity beyond 1, cart item gets removed from the cart and no longer displayed (hence why .filter is used before .map function)
    return(

        <>
            {(!displayCart && user === 'Client' && message !== '') && <p className='cart-alert'>{ message }</p>}
            {(!displayCart && user === 'Client') && <div className='cart-preview'>
                <button className='cart-preview-icon' onClick={changeCartVisibility}><AiOutlineShopping /></button>
                <div className='cart-preview-items'>{ items.filter(item => item.quantity > 0).length }</div>
            </div>}
            {(displayCart && user === 'Client') && <div className='cart'>
                <button className='cart-close' onClick={changeCartVisibility}></button>
                <div className='cart-contents'>
                    <ul>
                        { items.filter(item => item.quantity > 0).map(item => <li key={item.watch.IdWatches}><CartItem item={item} itemQuantity={itemQuantity} decrease={() => decreaseQuantity(item.watch)} increase={() => increaseQuantity(item.watch)} /></li>) }
                    </ul>
                </div>
                <div className='cart-operations'>
                    <button className='cart-operations-empty' onClick={emptyCart}>Empty Cart</button>
                    <span className='cart-operations-total'>{ calculateTotal() }</span>
                </div>
                <button className='cart-checkout' onClick={checkout} to={<Payment totalprice={calculateTotal}/>} primary='true'>Checkout</button>
            </div>}
        </>
    );
    
};

export default Cart;