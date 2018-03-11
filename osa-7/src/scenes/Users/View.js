import React from 'react';
import {Link} from 'react-router-dom';
import * as userService from '../../services/users';

class View extends React.Component {
	state = {data: {blogs: []}};

	async componentDidMount() {
		const data = await userService.get(this.props.match.params.id);
		this.setState({data});
	}

	render() {
		const {data} = this.state;
		return (
			<div>
				<h2>{data.name}</h2>
				<h3>Added Blogs</h3>
				<ul>
					{data.blogs.map(blog => (
						<li key={blog.id}>
							<Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default View;
