import express from 'express';
import asyncHandler from 'express-async-handler';
import Blog from '../../models/blog';
import User from '../../models/user';

export default () => {
	const router = express.Router();

	router.get('/', asyncHandler(async(request, response) => {
		try {
			const blogs = await Blog.find({}).populate('user', {username: 1, isAdult: 1});
			response.json(blogs);
		} catch (err) {
			console.log(err);
		}
	}));

	router.post('/', asyncHandler(async(request, response) => {
		const user = await User.findById(request.user.id);
		const blog = new Blog({...request.body, user: user.id});

		try {
			await blog.validate();
		} catch (err) {
			throw {status: 400, message: 'Bad Request'};
		}

		user.blogs = user.blogs.concat(blog.id);
		await user.save();

		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	}));

	router.delete('/:id', asyncHandler(async(request, response) => {
		const {id} = request.params;

		let blog;
		try {
			blog = await Blog.findById(id);
		} catch (err) {
			throw {status: 400, message: 'Invalid id'};
		}

		if (blog) {
			if (blog.user && blog.user.toString() !== request.user.id) {
				throw {status: 401, message: 'Cannot delete someone else\'s blog'};
			}

			await blog.remove();
		}

		response.status(204).json({message: 'deleted'});
	}));

	router.put('/:id', asyncHandler(async(request, response) => {
		const {id} = request.params;
		let blog;

		try {
			blog = await Blog.findByIdAndUpdate(id, request.body, {new: true}).populate('user', {username: 1, isAdult: 1});
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
