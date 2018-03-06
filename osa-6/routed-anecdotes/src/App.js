import React from 'react';
import {Route, Switch, NavLink, Link, withRouter} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Table, {TableBody, TableRow, TableCell} from 'material-ui/Table';
import Reboot from 'material-ui/Reboot';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const Menu = () => (
	<Paper style={{padding: '12px', marginBottom: '12px'}}>
		<Button component={NavLink} to="/">anecdotes</Button>&nbsp;
		<Button component={NavLink} to="/create">create new</Button>&nbsp;
		<Button component={NavLink} to="/about">about</Button>&nbsp;
	</Paper>
);

const AnecdoteList = ({anecdotes}) => (
	<Paper>
		<Typography variant="headline" style={{padding: '24px'}}>Anecdotes</Typography>
		<Table>
			<TableBody>
				{anecdotes.map(anecdote => (
					<TableRow key={anecdote.id}>
						<TableCell style={{borderTop: '1px solid #ddd', borderBottom: 'none'}}>
							<Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Paper>
);

const Anecdote = ({content, author, info, votes}) => (
	<Paper style={{padding: '24px'}}>
		<Typography variant="headline" style={{fontWeight: 'bold', marginBottom: '12px'}}>{`'${content}' by ${author}`}</Typography>
		<p>has {votes} votes</p>
		<p>for more info see <a href={info}>{info}</a></p>
	</Paper>
);

const About = () => (
	<Paper style={{padding: '24px'}}>
		<Grid container spacing={24}>
			<Grid item sm>
				<Typography variant="headline" style={{fontWeight: 'bold', marginBottom: '12px'}}>About anecdote app</Typography>

				<Typography variant="subheading" style={{padding: '12px'}}>According to Wikipedia:</Typography>

				<Typography variant="body1" style={{padding: '12px', fontStyle: 'italic'}}>
					An anecdote is a brief, revealing account of an individual person or an incident.
					Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply
					to provoke laughter but to reveal a truth more general than the brief tale itself,
					such as to characterize a person by delineating a specific quirk or trait, to communicate an
					abstract idea about a person, place, or thing through the concrete details of a short
					narrative.
					An anecdote is "a story with a point."
				</Typography>

				<Typography variant="body1" style={{padding: '12px'}}>
					Software engineering is full of excellent anecdotes, at this app you can find the best and add more.
				</Typography>
			</Grid>
			<Grid item>
				<img src="https://ih1.redbubble.net/image.361994403.5689/flat,800x800,070,f.u1.jpg" width={280} height={400}/>
			</Grid>
		</Grid>
	</Paper>
);

const Footer = () => (
	<Paper style={{padding: '24px', marginTop: '12px'}}>
		Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

		See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
	</Paper>
);

class CreateNew extends React.Component {
	constructor() {
		super();
		this.state = {
			content: '',
			author: '',
			info: ''
		};
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addNew({
			content: this.state.content,
			author: this.state.author,
			info: this.state.info,
			votes: 0
		});
	};

	render() {
		return (
			<Paper style={{padding: '24px'}}>
				<Typography variant="headline" style={{fontWeight: 'bold', marginBottom: '12px'}}>create a new anecdote</Typography>
				<form onSubmit={this.handleSubmit}>
					<div>
						<TextField
							required
							label="Content"
							name="content"
							value={this.state.content}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<TextField
							required
							label="Author"
							name="author"
							value={this.state.author}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<TextField
							label="url for more info"
							name="info"
							value={this.state.info}
							onChange={this.handleChange}
						/>
					</div>
					<div style={{marginTop: '12px'}}>
						<Button variant="raised" type="submit">create</Button>
					</div>
				</form>
			</Paper>
		);

	}
}

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			anecdotes: [
				{
					content: 'If it hurts, do it more often',
					author: 'Jez Humble',
					info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
					votes: 0,
					id: '1'
				},
				{
					content: 'Premature optimization is the root of all evil',
					author: 'Donald Knuth',
					info: 'http://wiki.c2.com/?PrematureOptimization',
					votes: 0,
					id: '2'
				}
			],
			notification: ''
		};
	}

	addNew = anecdote => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		this.setState({
			anecdotes: this.state.anecdotes.concat(anecdote),
			notification: `a new anecdote ${anecdote.content} created!`
		}, () => {
			this.props.history.push('/');
			setTimeout(() => {
				this.setState({notification: null});
			}, 10000);
		});
	};

	anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

	vote = id => {
		const anecdote = this.anecdoteById(id);

		const voted = {
			...anecdote,
			votes: anecdote.votes + 1
		};

		const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a);

		this.setState({anecdotes});
	};

	render() {
		return (
			<div style={{padding: '24px'}}>
				<Reboot/>
				<h1>Software anecdotes</h1>
				<Menu/>
				<Snackbar
					message={<span>{this.state.notification}</span>}
					open={Boolean(this.state.notification)}
					anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
				/>
				<Switch>
					<Route
						exact
						path="/"
						render={props => (
							<AnecdoteList {...props} anecdotes={this.state.anecdotes}/>
						)}
					/>
					<Route path="/about" component={About}/>
					<Route path="/create" render={props => <CreateNew {...props} addNew={this.addNew}/>}/>
					<Route path="/:id" render={({match, ...props}) => <Anecdote {...props} {...this.anecdoteById(match.params.id)}/>}/>
				</Switch>
				<Footer/>
			</div>
		);
	}
}

export default withRouter(App);
