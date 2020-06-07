import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { Link } from 'react-router-dom';
class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}
	renderList() {
		return this.props.surveys.reverse().map(survey => {
			return (
				<div className="card darken-1" key={survey._id}>
					<div className="card-content">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<div className="card-action">
						<Link>Yes: {survey.yes}</Link>
						<Link>No: {survey.no}</Link>
					</div>
				</div>
			);
		});
	}
	render() {
		return <div>{this.renderList()}</div>;
	}
}

const mapStateToProps = ({ surveys }) => ({ surveys });
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
