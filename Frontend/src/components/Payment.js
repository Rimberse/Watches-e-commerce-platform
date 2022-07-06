import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useEffect, useState } from 'react'
import "../styles/Payment.css"
import axios from 'axios';

const Payment = ({ totalprice, basket }) => {
  const [total, setTotal] = useState(0);
    
  useEffect(() => {
    let sum = 0;

    basket.forEach(item => {
      sum += item.Price;
      console.log(sum);
    });

    // setTotal(Math.round(sum));
    setTotal(sum);
  }, []);

  console.log(totalprice); 

  if (!basket){
    return(
      <h1>Page loading ...</h1>
    )
  } else {
  
    return (
      <div className="payment-body">
        <div className='title'>
          <h1 className='payment'>Payment</h1>
          <p className='pay-with-paypal'>Pay with PayPal</p>
          <br/>
          <div className="paypal-button-container">
            <PayPalScriptProvider options={{"client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
            <PayPalButtons createOrder={function(data, actions) {
            
              // Set up the transaction
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: 500
                  }
                }]
              })
            }}

            onApprove={function(data, actions) {
              // This function captures the funds from the transaction.
              return actions.order.capture().then(function(details) {
                // This function shows a transaction success message to your buyer.
                alert('Transaction completed by ' + details.payer.name.given_name);
              });
            }} ></PayPalButtons>
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    )
  } 
}

export default Payment;