import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Dashboard from './Dashboard';
import SurveyFlow from './survey/SurveyFlow';
import Landing from './Landing';

import { fetchUser } from '../actions';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				<Header />
				<div className="container">
					<Route path="/" component={Landing} exact />
					<Route path="/surveys" component={Dashboard} exact />
					<Route path="/surveys/new" component={SurveyFlow} />
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return { auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
