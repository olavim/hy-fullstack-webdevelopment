import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as feedbackActions from '../actions/feedback';

const Feedback = ({onGivePositiveFeedback, onGiveNeutralFeedback, onGiveNegativeFeedback}) => (
	<div>
		<h1>anna palautetta</h1>
		<div>
			<button onClick={onGivePositiveFeedback}>hyvä</button>
			<button onClick={onGiveNeutralFeedback}>neutraali</button>
			<button onClick={onGiveNegativeFeedback}>huono</button>
		</div>
	</div>
);

const Statistic = ({title, value}) => (
	<tr><td>{title}</td><td>{value}</td></tr>
);

const Statistics = ({positive, neutral, negative}) => (
	<div>
		<h1>statistiikka</h1>
		{positive + neutral + negative > 0 ?
			<table>
				<tbody>
				<Statistic title="hyvä" value={positive}/>
				<Statistic title="neutraali" value={neutral}/>
				<Statistic title="huono" value={negative}/>
				<Statistic
					title="keskiarvo"
					value={(positive - negative) / (positive + neutral + negative)}
				/>
				<Statistic
					title="positiivisia"
					value={(100 * positive / (positive + neutral + negative)) + '%'}
				/>
				</tbody>
			</table> :
			<p>yhtään palautetta ei ole annettu</p>
		}
	</div>
);

class App extends React.Component {
	render() {
		const {positive, neutral, negative} = this.props;

		return (
			<div>
				<Feedback
					onGivePositiveFeedback={this.props.givePositiveFeedback}
					onGiveNeutralFeedback={this.props.giveNeutralFeedback}
					onGiveNegativeFeedback={this.props.giveNegativeFeedback}
				/>
				<Statistics {...{positive, neutral, negative}}/>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(feedbackActions, dispatch);
const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(App);
