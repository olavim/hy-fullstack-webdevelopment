import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import Snackbar from '../../components/Snackbar';

class Login extends React.Component {
	static propTypes = {
		auth: PropTypes.shape({login: PropTypes.func}).isRequired,
		history: PropTypes.shape({push: PropTypes.func}).isRequired
	};

	state = {username: '', password: '', errorMessage: null};

	handleChangeUsername = evt => {
		this.setState({username: evt.target.value});
	};

	handleChangePassword = evt => {
		this.setState({password: evt.target.value});
	};

	handleSubmit = async(evt) => {
		evt.preventDefault();
		try {
			await this.props.auth.login(this.state);
			this.props.history.push('/');
		} catch (err) {
			this.setState({errorMessage: err.response.data.message});
		}
	};

	render() {
		return (
			<div>
				{this.state.errorMessage && <Snackbar type="error" message={this.state.errorMessage}/>}
				<div style={{padding: '12px'}}>
					<form onSubmit={this.handleSubmit} name="blog-login">
						<div>username: <input value={this.state.username} onChange={this.handleChangeUsername}/></div>
						<div>password: <input value={this.state.password} onChange={this.handleChangePassword} type="password"/></div>
						<div><input type="submit" value="Login"/></div>
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(withAuth(Login));
