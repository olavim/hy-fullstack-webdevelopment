'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
	const app = (0, _express2.default)();
	app.use((0, _cors2.default)());
	app.use(_bodyParser2.default.json());

	if (process.env.NODE_ENV === 'test') {
		app.use(/^(?!\/api\/login$)/, (req, res, next) => {
			req.user = JSON.parse(process.env.TEST_USER);
			next();
		});
	} else {
		app.use(/^(?!\/api\/login$)/, (0, _expressJwt2.default)({ secret: process.env.SECRET }));
	}

	app.use((0, _routes2.default)());

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