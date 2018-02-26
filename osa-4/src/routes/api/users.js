import express from 'express';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import User from '../../models/user';

export default () => {
	const router = express.Router();

	router.get('/', asyncHandler(async(request, response) => {
		const users = await User.find({}, {passwordHash: 0}).populate('blogs', {user: 0});
		response.json(users);
	}));

	router.post('/', asyncHandler(async(request, response) => {
		const {username, name, password, isAdult} = request.body;

		if (!password || password.length < 3) {
			throw {status: 400, message: 'Bad Request'};
		}

		const existingUsers = await User.find({username});
		if (existingUsers.length > 0) {
			throw {status: 400, message: 'Username Exists'};
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const user = new User({username, name, passwordHash, isAdult});

		try {
			await user.validate();
		} catch (err) {
			throw {status: 400, message: 'Bad Request'};
		}

		const savedUser = await user.save();
		delete savedUser.passwordHash;
		response.status(201).json(savedUser);
	}));

	router.delete('/:id', asyncHandler(async(request, response) => {
		const {id} = request.params;
		try {
			await User.findByIdAndRemove(id);
		} catch (err) {
			throw {status: 400, message: 'Invalid id'};
		}
		response.status(204).json({message: 'deleted'});
	}));

	router.put('/:id', asyncHandler(async(request, response) => {
		const {id} = request.params;
		let user;

		try {
			user = await User.findByIdAndUpdate(id, request.body, {new: true});
		} catch (err) {
			throw {status: 400, message: 'Invalid id'};
		}

		if (!user) {
			throw {status: 404, message: `Resource with id ${id} not found`};
		}

		response.status(201).json(user);
	}));

	return router;
};
