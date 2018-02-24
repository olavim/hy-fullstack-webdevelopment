import express from 'express';
import asyncHandler from 'express-async-handler';
import Blog from '../../models/blog';

export default () => {
	const router = express.Router();

	router.get('/', asyncHandler(async(request, response) => {
		const blogs = await Blog.find({});
		response.json(blogs);
	}));

	router.post('/', asyncHandler(async(request, response) => {
		const blog = new Blog(request.body);

		try {
			await blog.validate();
		} catch (err) {
			throw {status: 400, message: 'Bad Request'};
		}

		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	}));

	return router;
};
