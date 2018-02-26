import express from 'express';
import getBlogsApi from './blogs';
import getUsersApi from './users';
import getLoginApi from './login';

export default () => {
	const router = express.Router();
	router.use('/blogs', getBlogsApi());
	router.use('/users', getUsersApi());
	router.use('/login', getLoginApi());

	return router;
};
