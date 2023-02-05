import axios from 'axios'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';

const PUBLIC_STRIPE_KEY = 'pk_test_51LqqcxESEPNmkJUIELStPJiVJTYtzGGZ0Ka9K3ScJXv4PohJfOms4H0ZwS5XRho5T4b68uhuRy8GzCED3mfXW2NA0046TS2cmA'

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null)
  const navigate = useNavigate()

  const onToken = (token) => {
    console.log(token)
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async (req, res) => {
      try {
        const paymenRes = axios.post(
          'http://localhost:5500/api/stripe/payment',
          {
            tokenId: stripeToken.id,
            amount: 2000
          }
        )
        console.log(paymenRes?.data)
        navigate('/success')
      }
      catch (err) {
        console.error(err.message)
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken, navigate])
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {stripeToken ? (<span>Processing...</span>) : (
        <StripeCheckout
          name='Amumu Shop'
          image='https://c.tenor.com/W_GgSsF7x9sAAAAC/amumu-sad.gif'
          billingAddress
          shippingAddress
          description='Your total is $20'
          amount={2000}
          token={onToken}
          stripeKey={PUBLIC_STRIPE_KEY}
        >
          <button
            style={{
              border: 'none',
              width: 120,
              borderRadius: 5,
              padding: '20px',
              backgroundColor: 'black',
              color: 'white',
              fontWeight: '600px',
              cusor: 'pointer',
            }}
          >
            Paynow
          </button>
        </StripeCheckout>
      )}
    </div>
  )
}

export default Pay