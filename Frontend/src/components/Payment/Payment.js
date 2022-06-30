import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React, { useEffect, useState } from 'react'
import PaypalCheckoutButton from '../PaypalCheckoutButton'
import "./style.css";
import axios from 'axios';


const Payment = () => {
  const [data, setData] = useState(null);
    
  useEffect(() => {
    const loadData = async () => {
        try{
            const response = await axios.get("http://localhost:5000/api/shop/basket");
            setData(response);

        } catch (error){

        }
      };

    loadData();
  }, []);



    let total = 0;
    

    if(data == null){
      return(
        <h1>Page loading ...</h1>
      )
    }
    else{

      const calcTotal = () => {
        data.data.forEach(elem => {
          total += elem.Price
          console.log(total)
        })
        // Round cause paypal won't take too many numbers
        total = Math.round(total)
      }
      
      calcTotal();
  
  
    return (
      <body>
        <div className='title'>
          <h1 className='payment'>Payment</h1>
          <p className='pay-with-paypal'>Pay with PayPal</p>
          <br/>
          <div className="paypal-button-container">
          <PayPalScriptProvider options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID}}>
        <PayPalButtons createOrder={function(data, actions) {
          
        // Set up the transaction
        if(total != 0){
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: 10
              }
            }]
          })
        }
        else{
          
          console.log("Nothing found in the basket.")
        }
        
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
      </body>
    
      
    )
    }
    
}

export default Payment