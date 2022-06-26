import React from 'react';
import "../styles/CartItem.css";

const CartItem = ({ item }) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    });
    
    return(
        <div className='item'>
            <span className='image'><img src={ item.watch.Image } alt='Watch'></img></span>
            <div className='details'>
                <span className='details-name'>{ item.watch.Name }</span>
                <span className='details-brand'>{ item.watch.Brand }</span>
                <div className='details-quantity'>
                    <button className='details-quantity-decrease'>-</button>
                    <span className='details-quantity-count'>{ item.quantity }</span>
                    <button className='details-quantity-increase'>+</button>
                </div>
            </div>
            <span className='price'>{ formatter.format(item.quantity * item.watch.Price) }</span>
        </div>
    );
}

export default CartItem;