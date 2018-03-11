import React from 'react';
import {Link} from 'react-router-dom';
import * as userService from '../../services/users';

class List extends React.Component {
	state = {users: []};

	async componentDidMount() {
		const users = await userService.getAll();
		this.setState({users});
	}

	render() {
		const {users} = this.state;
		return (
			<div>
				<h2>Users</h2>
				<table>
					<thead>
						<tr>
							<th style={{textAlign: 'left'}}>Name</th>
							<th style={{textAlign: 'left'}}>Blogs Added</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
								<td>{user.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default List;
