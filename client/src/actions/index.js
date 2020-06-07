import { FETCH_USER, LOG_OUT, FETCH_SURVEYS } from './types';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
	const response = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleToken = token => async dispatch => {
	const response = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: response.data });
};

export const logOut = history => async dispatch => {
	const response = await axios.get('/api/logout');
	dispatch({ type: LOG_OUT, payload: response.data });
	history.push('/');
};

export const submitSurvey = (values, history) => async dispatch => {
	const response = await axios.post('/api/surveys', values);
	dispatch({ type: FETCH_USER, payload: response.data });
	history.push('/surveys');
};

export const fetchSurveys = (values, history) => async dispatch => {
	const response = await axios.get('/api/surveys');
	dispatch({ type: FETCH_SURVEYS, payload: response.data });
};
