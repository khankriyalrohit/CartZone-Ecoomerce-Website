import React,{useState,useEffect,Fragment} from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Payment from './Payment';
import axios from 'axios';

const PaymentStripe = () => {

    const [stripeApiKey, setStripeApiKey] = useState("");
    const[clientSecret,setClientSecret ] =useState("")

     useEffect(()=>{
        fetch("/api/v1/stripeapikey").then(async(r)=>{
            const {stripeApiKey} = await r.json();

            setStripeApiKey(loadStripe(stripeApiKey));
            console.log(stripeApiKey);
        })
     },[])

  return <Fragment>
    {stripeApiKey && (<Elements stripe ={stripeApiKey} >
    <Payment/>
   </Elements>) }
   </Fragment>
}

export default PaymentStripe
