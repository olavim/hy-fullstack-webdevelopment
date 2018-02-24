export const dummy = blogs => {
	return 1;
};

export const totalLikes = blogs => {
	const reducer = (sum, blog) => sum + blog.likes;
	return blogs.reduce(reducer, 0);
};

export const favouriteBlog = blogs => {
	if (blogs.length === 0) {
		return null;
	}

	const reducer = (favourite, current) => current.likes > favourite.likes ? current : favourite;
	return blogs.reduce(reducer, blogs[0]);
};

export const mostBlogs = blogs => {
	if (blogs.length === 0) {
		return null;
	}

	const authorMap = new Map();
	for (const blog of blogs) {
		const prevNumBlogs = authorMap.has(blog.author) ? authorMap.get(blog.author) : 0;
		authorMap.set(blog.author, prevNumBlogs + 1);
	}

	const reducer = (bestBlogger, [author, blogs]) => {
		return blogs > bestBlogger.blogs ? {author, blogs} : bestBlogger;
	};

	return Array.from(authorMap.entries()).reduce(reducer, {blogs: 0});
};
