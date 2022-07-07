import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Payment.css"

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromWhere = location.state?.fromWhere?.pathname || "/Shop";

  console.log('Total basket price: ' + localStorage.getItem('total'));

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
                  value: localStorage.getItem('total')
                }
              }]
            })
          }}

          onApprove={function(data, actions) {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function(details) {
              // This function shows a transaction success message to your buyer.
              alert('Transaction completed by ' + details.payer.name.given_name);
              localStorage.setItem('paymentProceeded', true);
              setTimeout(() => navigate(fromWhere, { replace: true }), 2000);
            });
          }} ></PayPalButtons>
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  )
}

export default Payment;
