import React from 'react';
import PropTypes from 'prop-types';

class BlogForm extends React.Component {
	static propTypes = {
		onSubmitBlog: PropTypes.func.isRequired
	};

	state = {title: '', author: '', url: ''};

	handleSubmit = evt => {
		evt.preventDefault();
		this.props.onSubmitBlog(this.state);
	};

	handleChangeTitle = evt => {
		this.setState({title: evt.target.value});
	};

	handleChangeAuthor = evt => {
		this.setState({author: evt.target.value});
	};

	handleChangeUrl = evt => {
		this.setState({url: evt.target.value});
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} name="blog-form">
				<div>title: <input value={this.state.title} onChange={this.handleChangeTitle}/></div>
				<div>author: <input value={this.state.author} onChange={this.handleChangeAuthor}/></div>
				<div>url: <input value={this.state.url} onChange={this.handleChangeUrl}/></div>
				<div><input type="submit" value="create"/></div>
			</form>
		);
	}
}

export default BlogForm;
