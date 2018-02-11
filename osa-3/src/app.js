import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import getRoutes from './routes';

morgan.token('body', (req, res) => JSON.stringify(req.body));

export default function(resources) {
	const app = express();

	app.set('view engine', 'ejs');
	app.set('views', path.resolve(__dirname, 'views'));
	app.use(bodyParser.json());
	app.use(cors());
	app.use(morgan((tokens, req, res) => (
		[
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.body(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'), '-',
			tokens['response-time'](req, res), 'ms'
		].join(' ')
	)));

	app.use('/', getRoutes(resources));

	app.use((err, req, res, next) => {
		res.status(err.status || 500).json({
			status: err.status || 500,
			message: err.message,
			stackTrace: err.stack
		});
	});
	return app;
}