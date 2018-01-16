import React from 'react';
import ReactDOM from 'react-dom';

const FeedbackButton = ({onClick, children}) => (
	<button onClick={onClick}>{children}</button>
);

const Feedback = ({onGiveFeedback}) => (
	<div>
		<h1>anna palautetta</h1>
		<div>
			<FeedbackButton onClick={onGiveFeedback('positive')}>hyvä</FeedbackButton>
			<FeedbackButton onClick={onGiveFeedback('neutral')}>neutraali</FeedbackButton>
			<FeedbackButton onClick={onGiveFeedback('negative')}>huono</FeedbackButton>
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
	state = {
		positive: 0,
		neutral: 0,
		negative: 0
	};

	handleFeedback = type => () => this.setState({[type]: this.state[type] + 1});

	render() {
		return (
			<div>
				<Feedback onGiveFeedback={this.handleFeedback}/>
				<Statistics {...this.state}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);