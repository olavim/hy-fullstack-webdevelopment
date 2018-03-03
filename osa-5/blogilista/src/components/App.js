import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Blogs from '../scenes/Blogs';
import Login from '../scenes/Login';
import withAuth from '../hocs/withAuth';

const AuthenticatedRoute = withAuth(
	({auth, component: Component, render, ...rest}) => (
		<Route
			{...rest}
			render={props =>
				auth.isAuthenticated() ? (
					render ? render(props) : <Component {...props}/>
				) : (
					<Redirect to="/login"/>
				)
			}
		/>
	)
);

class App extends React.Component {
	static propTypes = {
		auth: PropTypes.shape({
			isAuthenticated: PropTypes.func.isRequired,
			getTokenPayload: PropTypes.func.isRequired,
			login: PropTypes.func.isRequired,
			logout: PropTypes.func.isRequired
		}).isRequired
	};

	static childContextTypes = {
		auth: PropTypes.shape({
			isAuthenticated: PropTypes.func,
			getTokenPayload: PropTypes.func,
			login: PropTypes.func,
			logout: PropTypes.func
		})
	};

	getChildContext() {
		return {auth: this.props.auth};
	}

	render() {
		return (
			<Switch>
				<AuthenticatedRoute exact path="/" component={Blogs}/>
				<Route path="/login" render={props => <Login {...props}/>}/>
			</Switch>
		);
	}
}

export default App;
