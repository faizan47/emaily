import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

class Payment extends Component {
	render() {
		return (
			<StripeCheckout
				amount={500}
				name={'Emaily'}
				description={'5 credits for $5'}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
			>
				<button className="btn">Add Credit</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, { handleToken })(Payment);
