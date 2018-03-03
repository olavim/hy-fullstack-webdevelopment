'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _blog = require('../../models/blog');

var _blog2 = _interopRequireDefault(_blog);

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = () => {
	const router = _express2.default.Router();

	router.get('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref = _asyncToGenerator(function* (request, response) {
			try {
				const blogs = yield _blog2.default.find({}).populate('user', { username: 1, isAdult: 1 });
				response.json(blogs);
			} catch (err) {
				console.log(err);
			}
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})()));

	router.post('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref2 = _asyncToGenerator(function* (request, response) {
			const user = yield _user2.default.findById(request.user.id);
			const blog = new _blog2.default(_extends({}, request.body, { user: user.id }));

			try {
				yield blog.validate();
			} catch (err) {
				throw { status: 400, message: 'Bad Request' };
			}

			user.blogs = user.blogs.concat(blog.id);
			yield user.save();

			const savedBlog = yield blog.save();
			response.status(201).json(savedBlog);
		});

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	})()));

	router.delete('/:id', (0, _expressAsyncHandler2.default)((() => {
		var _ref3 = _asyncToGenerator(function* (request, response) {
			const { id } = request.params;

			let blog;
			try {
				blog = yield _blog2.default.findById(id);
			} catch (err) {
				throw { status: 400, message: 'Invalid id' };
			}

			if (blog) {
				if (blog.user.toString() !== request.user.id) {
					throw { status: 401, message: 'Cannot delete someone else\'s blog' };
				}

				yield blog.remove();
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
			let blog;

			try {
				blog = yield _blog2.default.findByIdAndUpdate(id, request.body, { new: true }).populate('user', { username: 1, isAdult: 1 });
			} catch (err) {
				throw { status: 400, message: 'Invalid id' };
			}

			if (!blog) {
				throw { status: 404, message: `Resource with id ${id} not found` };
			}

			response.status(201).json(blog);
		});

		return function (_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	})()));

	return router;
};
//# sourceMappingURL=blogs.js.map