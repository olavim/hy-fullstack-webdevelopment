import React from 'react';
import PropTypes from 'prop-types';

class Blog extends React.Component {
	static propTypes = {
		blog: PropTypes.object.isRequired,
		onLike: PropTypes.func.isRequired,
		onDelete: PropTypes.func.isRequired,
		deletable: PropTypes.bool.isRequired
	};

	state = {expanded: false};

	handleClick = () => {
		this.setState(prevState => ({expanded: !prevState.expanded}));
	};

	handleClickLike = evt => {
		evt.stopPropagation();
		this.props.onLike(this.props.blog);
	};

	handleClickDelete = evt => {
		evt.stopPropagation();
		this.props.onDelete(this.props.blog);
	};

	render() {
		const {blog} = this.props;
		return (
			<div
				style={{padding: '6px', margin: '6px 0', border: '1px solid #aaa', cursor: 'pointer'}}
				onClick={this.handleClick}
			>
				{blog.title} - {blog.author}
				<div style={{display: this.state.expanded ? 'block' : 'none'}}>
					<div><a href={blog.url}>{blog.url}</a></div>
					<div>{blog.likes} likes <button onClick={this.handleClickLike}>like</button></div>
					<div>added by {blog.user.username}</div>
					<div><button onClick={this.handleClickDelete}>delete</button></div>
				</div>
			</div>
		);
	}
}

export default Blog;