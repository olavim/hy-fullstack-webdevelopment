import React from 'react';
import {Link} from 'react-router-dom';
import * as blogService from '../../services/blogs';

class View extends React.Component {
	state = {data: {user: {}, comments: []}, comment: ''};

	async componentDidMount() {
		const data = await blogService.get(this.props.match.params.id);
		this.setState({data});
	}

	handleClickLike = async () => {
		const res = await blogService.like(this.state.data);
		this.setState({data: res});
	};

	handleChangeComment = evt => {
		this.setState({comment: evt.target.value});
	};

	handleAddComment = async () => {
		await blogService.addComment(this.state.data.id, this.state.comment);
		const newComments = [...this.state.data.comments.slice(), this.state.comment];
		const updatedBlog = Object.assign({}, this.state.data, {comments: newComments});
		this.setState({data: updatedBlog, comment: ''});
	};

	render() {
		const {data} = this.state;
		return (
			<div>
				<h2>{data.title} by {data.author}</h2>
				<div>
					<div><a href={data.url}>{data.url}</a></div>
					<div>{data.likes} likes <button onClick={this.handleClickLike}>like</button></div>
					<div>added by <Link to={`/users/${data.user.id}`}>{data.user.username}</Link></div>
				</div>
				<h3>Comments</h3>
				<ul>
					{data.comments.map((comment, index) => (
						<li key={index}>{comment}</li>
					))}
				</ul>
				<input onChange={this.handleChangeComment} value={this.state.comment}/><button onClick={this.handleAddComment}>add comment</button>
			</div>
		);
	}
}

export default View;
