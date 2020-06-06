import React, { Component, Fragment } from 'react';
import CreateSurvey from './CreateSurvey';
import SurveyReview from './SurveyReview';

class SurveyFlow extends Component {
	state = { displayForm: true };

	toggleSurveyForm = () => {
		this.setState({ displayForm: !this.state.displayForm });
	};
	render() {
		return (
			<Fragment>
				{this.state.displayForm ? (
					<CreateSurvey toggleSurveyForm={this.toggleSurveyForm} />
				) : (
					<SurveyReview toggleSurveyForm={this.toggleSurveyForm} />
				)}
			</Fragment>
		);
	}
}

export default SurveyFlow;
