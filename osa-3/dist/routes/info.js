'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _person = require('../models/person');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = () => {
	const router = _express2.default.Router();

	router.get('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref = _asyncToGenerator(function* (req, res) {
			const numPersons = yield _person2.default.count({});
			res.render('info', {
				numPersons: numPersons,
				time: new Date().toString()
			});
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})()));

	return router;
};
//# sourceMappingURL=info.js.map