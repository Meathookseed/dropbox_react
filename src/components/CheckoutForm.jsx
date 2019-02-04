import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'

class CheckoutForm extends Component {
     submit = async (ev) => {
        ev.preventDefault();
        const {token} = await this.props.stripe.createToken({name:"Name"});
        await axios.post('http://0.0.0.0:5000/charge/', {
            'stripeToken':token.id
        }, { headers:{
            'Bearer':localStorage.getItem('token')}
        })
    };

    render() {
        return (
            <div className="container align-content-center text-sm-center">
                <br/>
                <CardElement style={{ base: {
                        color: '#32325d',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '30px',
                        '::placeholder': {
                            color: '#aab7c4'
                        }
                    },
                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a'
                    }}}/>
                <button  className=' mdc-button mdc-button--raised' onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
