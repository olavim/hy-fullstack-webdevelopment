'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _blog = require('../../models/blog');

var _blog2 = _interopRequireDefault(_blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = () => {
	const router = _express2.default.Router();

	app.get('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref = _asyncToGenerator(function* (request, response) {
			const blogs = yield _blog2.default.find({});
			response.json(blogs);
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})()));

	app.post('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref2 = _asyncToGenerator(function* (request, response) {
			const blog = new _blog2.default(request.body);
			const savedBlog = yield blog.save();
			response.status(201).json(savedBlog);
		});

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	})()));

	return router;
};
//# sourceMappingURL=blogs.js.map