import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../../models/user';

export default () => {
	const router = express.Router();

	router.post('/', asyncHandler(async(request, response) => {
		const {username, password} = request.body;

		const user = await User.findOne({username});

		if (!user) {
			throw {status: 400, message: 'Invalid username'};
		}

		const passwordCorrect = user === null ?
			false :
			await bcrypt.compare(password, user.passwordHash);

		if (!passwordCorrect) {
			throw {status: 401, message: 'Invalid password'};
		}

		const userForToken = {
			username: user.username,
			id: user.id
		};

		const token = jwt.sign(userForToken, process.env.SECRET);

		response.status(200).send({token, username: user.username});
	}));

	return router;
};
