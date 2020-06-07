import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import formFields from './formInputs';
import { Link } from 'react-router-dom';
import { validateEmails } from '../utils/validateEmail';

class CreateSurvey extends Component {
	renderFormFields = () =>
		formFields.map(({ name, label }) => (
			<div key={name}>
				<Field name={name} label={label} component={SurveyField} />
			</div>
		));

	render() {
		return (
			<div className="container">
				<h4>Enter survey details</h4>
				<form style={{ marginTop: '10px' }} onSubmit={this.props.handleSubmit(this.props.toggleSurveyForm)}>
					{this.renderFormFields()}
					<button className="right red btn waves-effect waves-light" type="submit">
						Submit
						<i className="material-icons right">send</i>
					</button>
				</form>
				<Link to="/surveys">
					<button className="left grey btn waves-effect waves-light">
						Cancel
						<i className="material-icons right">cancel</i>
					</button>
				</Link>
			</div>
		);
	}
}
const validate = values => {
	const errors = {};
	const invalidEmails = validateEmails(values.recipients || '');
	if (invalidEmails.length) {
		errors.recipients = `The following emails are invalid ${invalidEmails}`;
	}

	formFields.map(({ name }) => {
		if (!values[name]) {
			return (errors[name] = 'Must provide an input');
		}
		return values[name];
	});

	return errors;
};

export default reduxForm({
	form: 'createSurvey',
	validate,
	destroyOnUnmount: false
})(CreateSurvey);
