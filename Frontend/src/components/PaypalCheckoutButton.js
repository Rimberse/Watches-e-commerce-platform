import {PayPalButtons} from "@paypal/react-paypal-js";
import './style.css';

const PaypalCheckoutButton = (props) => {
    const { product } = props;

    return <PayPalButtons/>;
};

export default PaypalCheckoutButton;