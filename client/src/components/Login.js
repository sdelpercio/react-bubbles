import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	});
	const history = useHistory();

	const handleChange = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/login', credentials)
			.then(res => {
				window.localStorage.setItem('token', res.data.payload);
				history.push('/bubbles-page');
			})
			.catch(err => {
				console.log('error from post', err);
			});
	};

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='username'
					placeholder='username'
					value={credentials.username}
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='password'
					value={credentials.password}
					onChange={handleChange}
					required
				/>
				<button type='submit'>Login</button>
			</form>
		</>
	);
};

export default Login;
