import React from 'react';
import PropTypes from 'prop-types';

export default WrappedComponent => {
	class WithAuth extends React.Component {
		static contextTypes = {
			auth: PropTypes.shape({
				isAuthenticated: PropTypes.func,
				getTokenPayload: PropTypes.func,
				login: PropTypes.func,
				logout: PropTypes.func
			})
		};

		render() {
			return (
				<WrappedComponent {...this.props} auth={this.context.auth}/>
			);
		}
	}

	return WithAuth;
};
