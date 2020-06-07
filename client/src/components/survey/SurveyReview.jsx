import React, { Component } from 'react';
import { connect } from 'react-redux';
import formInputs from './formInputs';
import { withRouter } from 'react-router-dom';
import { submitSurvey } from '../../actions';

class SurveyReview extends Component {
	renderReviewForm() {
		const { values } = this.props.formValues;
		return formInputs.map(({ name }) => (
			<div key={name} className="input-field col s12">
				<input disabled value={values[name]} type="text" className="validate" />
			</div>
		));
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

const mapStateToProps = state => ({ formValues: state.form.createSurvey });

export default connect(mapStateToProps, { submitSurvey })(withRouter(SurveyReview));
