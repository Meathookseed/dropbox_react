import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        ev.preventDefault();
        let {token} = await this.props.stripe.createToken({name:"Name"});
        console.log(token);
        await axios.post('http://0.0.0.0:5000/charge/', {
            'stripeToken':token.id
        }, { headers:{
            'Bearer':localStorage.getItem('token')}
        })
    }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement style={{base:{fontSize:'50px'}}}/>
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
