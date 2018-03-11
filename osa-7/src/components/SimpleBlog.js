import React from 'react';

const SimpleBlog = ({blog, onClick}) => (
	<div>
		<div className="header">
			{blog.title} {blog.author}
		</div>
		<div className="content">
			blog has <span className="num-likes">{blog.likes}</span> likes
			<button onClick={onClick}>like</button>
		</div>
	</div>
);

export default SimpleBlog;
