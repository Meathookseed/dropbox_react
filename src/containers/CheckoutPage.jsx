import React, { Component } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import {StripeProvider, Elements} from 'react-stripe-elements';
export class CheckoutPage extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_5B87ZrxvYF2ZHNUBua77nUcT">
            <Elements>
        <CheckoutForm/>
            </Elements>
        </StripeProvider>
      </div>
    )
  }
}

export default CheckoutPage