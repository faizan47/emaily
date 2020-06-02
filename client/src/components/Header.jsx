import React, { Component } from 'react';
import { Link, BrowserRouter } from 'react-router-dom';
import { fetchUser, logOut } from '../actions/';
import { connect } from 'react-redux';
import Payment from './Payment';

class Header extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	renderNav() {
		// switch (this.props.auth) {
		// 	case true:
		// 		return (
		// 			<li>
		// 				<a href="/api/logout">Logout</a>
		// 			</li>
		// 		);
		// 	case false:
		// 		return (
		// 			<li>
		// 				<a href="/auth/google">Sign In with Google</a>
		// 			</li>
		// 		);
		// 	default:
		// 		return 'checking..';
		// }
		if (this.props.auth) {
			return [
				<li key={1}>
					<Payment />
				</li>,
				<li style={{ margin: '0 10px' }} key={2}>
					Credits: {this.props.auth.credits}
				</li>,
				<li onClick={this.props.logOut} key={3}>
					<BrowserRouter>
						<Link to="/">Log Out</Link>
					</BrowserRouter>
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
					<BrowserRouter>
						<Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
							Emaily
						</Link>
					</BrowserRouter>
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

export default connect(mapStateToProps, { fetchUser, logOut })(Header);
