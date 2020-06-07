import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import SurveyList from './survey/SurveyList';

class Dashboard extends Component {
	render() {
		return (
			<div>
				<h2>Dashboard</h2>
				<SurveyList />
				<div className="fixed-action-btn">
					<Link to="/surveys/new" className="btn-floating btn-large red">
						<i className="material-icons">add</i>
					</Link>
				</div>
			</div>
		);
	}
}

export default reduxForm({
	form: 'createSurvey'
})(Dashboard);
