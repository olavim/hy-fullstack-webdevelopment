import React from 'react';
import Filter from './Filter';
import {vote} from '../actions/anecdote';
import {connect} from 'react-redux';

class AnecdoteList extends React.Component {
	render() {
		return (
			<div>
				<h2>{'Anecdotes'}</h2>
				<Filter/>
				{
					this.props.anecdotesToShow
						.sort((a, b) => b.votes - a.votes).map(anecdote => (
							<div key={anecdote.id}>
								<div>
									{anecdote.content}
								</div>
								<div>
									{`has ${anecdote.votes}`}
									<button onClick={() => this.props.vote(anecdote)}>
										{'vote'}
									</button>
								</div>
							</div>
						))
				}
			</div>
		);
	}
}

const mapStateToProps = ({anecdote, filter}) => ({
	anecdotesToShow: anecdote.filter(a => a.content.includes(filter))
});

const mapDispatchToProps = dispatch => ({
	vote: anecdote => dispatch(vote(anecdote))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
