import React, { Component } from 'react';
import { connect } from 'react-redux';
import formInputs from './formInputs';
import { Link, withRouter } from 'react-router-dom';
import { submitSurvey } from '../../actions';

class SurveyReview extends Component {
	renderReviewForm() {
		return formInputs.map(({ name }) => {
			return (
				<div key={name} className="input-field col s12">
					<input
						disabled
						value={this.props.formValues.values[name]}
						id="disabled"
						type="text"
						className="validate"
					/>
				</div>
			);
		});
	}
	render() {
		return (
			<div className="container">
				<h4>Review your survey</h4>
				{this.renderReviewForm()}
				<button onClick={this.props.toggleSurveyForm} className="left btn waves-effect waves-light">
					Modify
					<i className="material-icons right">edit</i>
				</button>

				<button
					onClick={() => {
						this.props.submitSurvey(this.props.formValues.values, this.props.history);
					}}
					className="right red btn waves-effect waves-light"
				>
					Send Survey
					<i className="material-icons right">send</i>
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { formValues: state.form.createSurvey };
};

export default connect(mapStateToProps, { submitSurvey })(withRouter(SurveyReview));
