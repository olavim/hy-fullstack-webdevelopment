import React from 'react';
import PropTypes from 'prop-types';

const styles = {
	error: {
		padding: '12px',
		border: '2px solid #f00',
		color: '#f00'
	},
	success: {
		padding: '12px',
		border: '2px solid #29c728',
		color: '#29c728'
	}
};

const Snackbar = ({type, message}) => (
	<div style={styles[type]}>
		{message}
	</div>
);

Snackbar.propTypes = {
	type: PropTypes.oneOf(['error', 'success']).isRequired,
	message: PropTypes.string.isRequired
};

export default Snackbar;
