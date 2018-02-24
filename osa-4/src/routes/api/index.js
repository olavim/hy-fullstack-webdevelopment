import express from 'express';
import getBlogsApi from './blogs';

export default () => {
	const router = express.Router();
	router.use('/blogs', getBlogsApi());

	return router;
};
