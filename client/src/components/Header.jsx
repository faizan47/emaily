import React, { Component } from 'react';
import { Link, BrowserRouter, withRouter } from 'react-router-dom';
import { fetchUser, logOut } from '../actions/';
import { connect } from 'react-redux';
import Payment from './Payment';

class Header extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	renderNav() {
		if (this.props.auth) {
			return [
				<li key={1}>
					<Payment />
				</li>,
				<li style={{ margin: '0 10px' }} key={2}>
					Credits: {this.props.auth.credits}
				</li>,
				<li
					style={{ cursor: 'pointer', margin: '0 10px' }}
					onClick={() => this.props.logOut(this.props.history)}
					key={3}
				>
					Log Out
				</li>
			];
		} else if (this.props.auth === false) {
			return (
				<li>
					<a href="/auth/google">Sign In with Google</a>
				</li>
			);
		} else {
			return null;
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
						Emaily
					</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{this.renderNav()}
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return { auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser, logOut })(withRouter(Header));
