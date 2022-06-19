import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import PaypalCheckoutButton from '../PaypalCheckoutButton'
import "./style.css";

const Payment = () => {

    const product = [
      {
        name: 'Watch name',
        brand: 'Watch brand',
        description: 'Watch description goes here...',
        image: 'https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro/img/one/huawei-watch-3-pro-kv.png',
        price: 249
      },
      {
        name: 'Watch name',
        brand: 'Watch brand',
        description: 'Watch description goes here...',
        image: 'https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro/img/one/huawei-watch-3-pro-kv.png',
        price: 589
      }
    ]

    let total = 0;
    
    const calcTotal = () => {
      product.forEach(elem => {
        total += elem.price
      })
    }
    
    calcTotal();

  return (
    <div className='title'>
        <h1>Payment</h1>
        <p className='pay-with-paypal'>Pay with PayPal</p>
        <div className="paypal-button-container">
        <PayPalScriptProvider options={{"client-id":"AVzSRfz6W2mUqu_Vx4wubVEk5C0q94tpusPIjiNMEd_hC4YyPmTt8qyE0BWRNnGNdZjgfONQTP141zlw"}}>
      <PayPalButtons createOrder={function(data, actions) {
        
      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total
          }
        }]
      });
      }} ></PayPalButtons>
    </PayPalScriptProvider>
        </div>
    </div>
  )
}

export default Payment