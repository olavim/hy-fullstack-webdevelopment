import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import * as blogService from '../../services/blogs';
import withAuth from '../../hocs/withAuth';
import Snackbar from '../../components/Snackbar';
import Blog from './Blog';
import BlogForm from './BlogForm';

class Blogs extends React.Component {
	static propTypes = {
		auth: PropTypes.shape({
			getTokenPayload: PropTypes.func,
			logout: PropTypes.func
		}).isRequired,
		history: PropTypes.shape({push: PropTypes.func}).isRequired
	};

	state = {blogs: [], showForm: false, message: null, errorMessage: null};

	async componentDidMount() {
		const blogs = await blogService.getAll();
		this.setState({blogs});
	}

	handleClickLogout = () => {
		this.props.auth.logout();
		this.props.history.push('/login');
	};

	handleSubmitBlog = async(data) => {
		try {
			const res = await blogService.create(data);
			this.setState(prevState => ({
				blogs: [...prevState.blogs, res],
				message: `a new blog '${res.title}' by ${res.author} added`,
				errorMessage: null
			}));
		} catch (err) {
			this.setState({message: null, errorMessage: err.response.data.message});
		}
	};

	handleLike = async(blog) => {
		const index = this.state.blogs.findIndex(b => b.id === blog.id);
		try {
			const res = await blogService.like(blog);
			this.setState(prevState => {
				prevState.blogs.splice(index, 1, res);
				return {blogs: prevState.blogs};
			});
		} catch (err) {
			this.setState({message: null, errorMessage: err.response.data.message});
		}
	};

	handleDelete = async(blog) => {
		if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
			const index = this.state.blogs.findIndex(b => b.id === blog.id);
			try {
				await blogService.remove(blog.id);
				this.setState(prevState => {
					prevState.blogs.splice(index, 1);
					return {
						blogs: prevState.blogs,
						message: `deleted '${blog.title}' by ${blog.author}`
					};
				});
			} catch (err) {
				this.setState({message: null, errorMessage: err.response.data.message});
			}
		}
	};

	handleToggleForm = () => {
		this.setState(prevState => ({showForm: !prevState.showForm}));
	};

	render() {
		const sortedBlogs = this.state.blogs.sort((a, b) => b.likes - a.likes);
		const loggedInUser = this.props.auth.getTokenPayload().username;

		return (
			<div style={{padding: '12px', position: 'relative'}}>
				<h2>blogs</h2>
				{this.state.message && <Snackbar type="success" message={this.state.message}/>}
				{this.state.errorMessage && <Snackbar type="error" message={this.state.errorMessage}/>}
				<div style={{marginTop: '18px'}}>
					Logged in as {this.props.auth.getTokenPayload().username} <button onClick={this.handleClickLogout}>Logout</button>
				</div>
				<h3>create new</h3>
				<button onClick={this.handleToggleForm}>{this.state.showForm ? 'Hide' : 'Show'} form</button>
				{this.state.showForm && <BlogForm onSubmitBlog={this.handleSubmitBlog}/>}
				<h3>list</h3>
				<div style={{margin: '18px 0'}}>
					{sortedBlogs.map(blog =>
						<Blog
							key={blog.id}
							blog={blog}
							deletable={!blog.user || blog.user.username === loggedInUser}
							onLike={this.handleLike}
							onDelete={this.handleDelete}
						/>
					)}
				</div>
			</div>
		);
	}
}

export default withRouter(withAuth(Blogs));
