import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import { fetchUser } from './actions';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}
	renderContent() {
		return this.props.auth ? <Dashboard /> : <Landing />;
	}
	render() {
		return (
			<div>
				<Header />
				<BrowserRouter>{this.renderContent()}</BrowserRouter>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
