import express from 'express';
import asyncHandler from 'express-async-handler';
import Blog from '../../models/blog';

export default () => {
	const router = express.Router();


	app.get('/', asyncHandler(async(request, response) => {
		const blogs = await Blog.find({});
		response.json(blogs);
	}));

	app.post('/', asyncHandler(async(request, response) => {
		const blog = new Blog(request.body);
		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	}));

	return router;
};
