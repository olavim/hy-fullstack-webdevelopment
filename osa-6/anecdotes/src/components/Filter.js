import React from 'react';
import {connect} from 'react-redux';
import {set} from '../actions/filter';

class Filter extends React.Component {
	handleChange = event => {
		this.props.setFilter(event.target.value);
	};

	render() {
		const style = {
			marginBottom: 10
		};

		return (
			<div style={style}>
				filter <input onChange={this.handleChange}/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setFilter: text => dispatch(set(text))
});

export default connect(null, mapDispatchToProps)(Filter);
