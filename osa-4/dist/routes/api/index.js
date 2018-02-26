'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _blogs = require('./blogs');

var _blogs2 = _interopRequireDefault(_blogs);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
	const router = _express2.default.Router();
	router.use('/blogs', (0, _blogs2.default)());
	router.use('/users', (0, _users2.default)());
	router.use('/login', (0, _login2.default)());

	return router;
};
//# sourceMappingURL=index.js.map