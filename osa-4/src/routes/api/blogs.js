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

	router.delete('/:id', asyncHandler(async(request, response) => {
		const {id} = request.params;
		try {
			await Blog.findByIdAndRemove(id);
		} catch (err) {
			throw {status: 400, message: 'Invalid id'};
		}
		response.status(204).json({message: 'deleted'});
	}));

	router.put('/:id', asyncHandler(async(request, response) => {
		const {id} = request.params;
		let blog;

		try {
			blog = await Blog.findByIdAndUpdate(id, request.body, {new: true});
		} catch (err) {
			throw {status: 400, message: 'Invalid id'};
		}

		if (!blog) {
			throw {status: 404, message: `Resource with id ${id} not found`};
		}

		response.status(201).json(blog);
	}));

	return router;
};
