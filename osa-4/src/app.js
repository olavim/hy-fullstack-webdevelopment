import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import getRoutes from './routes';

export default () => {
	const app = express();
	app.use(cors());
	app.use(bodyParser.json());

	app.use(getRoutes());

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		res.status(err.status || 500).json({
			status: err.status || 500,
			message: err.message,
			stackTrace: err.stack
		});
	});

	return app;
}
