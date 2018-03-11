import React from 'react';
import {Route, Switch, Redirect, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Blogs, {BlogView} from '../scenes/Blogs';
import Users, {UserView} from '../scenes/Users';
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
		}).isRequired,
		history: PropTypes.shape({push: PropTypes.func}).isRequired
	};

	static childContextTypes = {
		auth: PropTypes.shape({
			isAuthenticated: PropTypes.func,
			getTokenPayload: PropTypes.func,
			login: PropTypes.func,
			logout: PropTypes.func
		})
	};

	handleClickLogout = () => {
		this.props.auth.logout();
		this.props.history.push('/login');
	};

	getChildContext() {
		return {auth: this.props.auth};
	}

	render() {
		return (
			<div style={{padding: '12px', position: 'relative'}}>
				<h2>blog app</h2>
				{this.props.auth.isAuthenticated() &&
					<div style={{marginTop: '18px'}}>
						<NavLink to="/" style={{marginRight: '12px'}}>blogs</NavLink>
						<NavLink to="/users" style={{marginRight: '12px'}}>users</NavLink>
						<span style={{marginRight: '12px'}}>Logged in as {this.props.auth.getTokenPayload().username}</span>
						<button onClick={this.handleClickLogout}>Logout</button>
					</div>
				}
				<Switch>
					<AuthenticatedRoute exact path="/" component={Blogs}/>
					<AuthenticatedRoute path="/blogs/:id" component={BlogView}/>
					<AuthenticatedRoute exact path="/users" component={Users}/>
					<AuthenticatedRoute path="/users/:id" component={UserView}/>
					<Route path="/login" render={props => <Login {...props}/>}/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
