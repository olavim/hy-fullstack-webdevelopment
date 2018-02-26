'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = () => {
	const router = _express2.default.Router();

	router.get('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref = _asyncToGenerator(function* (request, response) {
			const users = yield _user2.default.find({}, { passwordHash: 0 }).populate('blogs', { user: 0 });
			response.json(users);
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})()));

	router.post('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref2 = _asyncToGenerator(function* (request, response) {
			const { username, name, password, isAdult } = request.body;

			if (!password || password.length < 3) {
				throw { status: 400, message: 'Bad Request' };
			}

			const existingUsers = yield _user2.default.find({ username });
			if (existingUsers.length > 0) {
				throw { status: 400, message: 'Username Exists' };
			}

			const passwordHash = yield _bcrypt2.default.hash(password, 10);
			const user = new _user2.default({ username, name, passwordHash, isAdult });

			try {
				yield user.validate();
			} catch (err) {
				throw { status: 400, message: 'Bad Request' };
			}

			const savedUser = yield user.save();
			delete savedUser.passwordHash;
			response.status(201).json(savedUser);
		});

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	})()));

	router.delete('/:id', (0, _expressAsyncHandler2.default)((() => {
		var _ref3 = _asyncToGenerator(function* (request, response) {
			const { id } = request.params;
			try {
				yield _user2.default.findByIdAndRemove(id);
			} catch (err) {
				throw { status: 400, message: 'Invalid id' };
			}
			response.status(204).json({ message: 'deleted' });
		});

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	})()));

	router.put('/:id', (0, _expressAsyncHandler2.default)((() => {
		var _ref4 = _asyncToGenerator(function* (request, response) {
			const { id } = request.params;
			let user;

			try {
				user = yield _user2.default.findByIdAndUpdate(id, request.body, { new: true });
			} catch (err) {
				throw { status: 400, message: 'Invalid id' };
			}

			if (!user) {
				throw { status: 404, message: `Resource with id ${id} not found` };
			}

			response.status(201).json(user);
		});

		return function (_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	})()));

	return router;
};
//# sourceMappingURL=users.js.map