'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_morgan2.default.token('body', req => JSON.stringify(req.body));

exports.default = () => {
	const app = (0, _express2.default)();

	app.set('view engine', 'ejs');
	app.set('views', _path2.default.resolve(__dirname, 'views'));
	app.use(_bodyParser2.default.json());
	app.use((0, _cors2.default)());
	app.use((0, _morgan2.default)((tokens, req, res) => [tokens.method(req, res), tokens.url(req, res), tokens.body(req, res), tokens.status(req, res), tokens.res(req, res, 'content-length'), '-', tokens['response-time'](req, res), 'ms'].join(' ')));

	app.use('/', (0, _routes2.default)());
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../web')));

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		res.status(err.status || 500).json({
			status: err.status || 500,
			message: err.message,
			stackTrace: err.stack
		});
	});

	return app;
};
//# sourceMappingURL=app.js.map