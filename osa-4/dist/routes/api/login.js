'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = () => {
	const router = _express2.default.Router();

	router.post('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref = _asyncToGenerator(function* (request, response) {
			const { username, password } = request.body;

			const user = yield _user2.default.findOne({ username });

			if (!user) {
				throw { status: 400, message: 'Invalid username' };
			}

			const passwordCorrect = user === null ? false : yield _bcrypt2.default.compare(password, user.passwordHash);

			if (!passwordCorrect) {
				throw { status: 401, message: 'Invalid password' };
			}

			const userForToken = {
				username: user.username,
				id: user.id
			};

			const token = _jsonwebtoken2.default.sign(userForToken, process.env.SECRET);

			response.status(200).send({ token, username: user.username });
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})()));

	return router;
};
//# sourceMappingURL=login.js.map