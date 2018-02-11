'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressAsyncHandler = require('express-async-handler');

var _expressAsyncHandler2 = _interopRequireDefault(_expressAsyncHandler);

var _person = require('../../models/person');

var _person2 = _interopRequireDefault(_person);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const isValidId = id => id.match(/^[0-9a-fA-F]{24}$/);

exports.default = () => {
	const router = _express2.default.Router();

	router.use('/:id', (req, res, next) => {
		if (!isValidId(req.params.id)) {
			throw { status: 400, message: 'invalid id' };
		}

		next();
	});

	router.get('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref = _asyncToGenerator(function* (req, res) {
			const persons = yield _person2.default.find();
			res.json(persons);
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})()));

	router.get('/:id', (0, _expressAsyncHandler2.default)((() => {
		var _ref2 = _asyncToGenerator(function* (req, res) {
			const { id } = req.params;
			const person = yield _person2.default.findById(id);

			if (!person) {
				throw { status: 404, message: 'record does not exist' };
			}

			res.json(person);
		});

		return function (_x3, _x4) {
			return _ref2.apply(this, arguments);
		};
	})()));

	router.delete('/:id', (0, _expressAsyncHandler2.default)((() => {
		var _ref3 = _asyncToGenerator(function* (req, res) {
			const { id } = req.params;
			yield _person2.default.findByIdAndRemove(id);
			res.json({ status: 'ok' });
		});

		return function (_x5, _x6) {
			return _ref3.apply(this, arguments);
		};
	})()));

	router.put('/:id', (0, _expressAsyncHandler2.default)((() => {
		var _ref4 = _asyncToGenerator(function* (req, res) {
			const { id } = req.params;
			const person = yield _person2.default.findByIdAndUpdate(id, req.body, { new: true });
			res.json(person);
		});

		return function (_x7, _x8) {
			return _ref4.apply(this, arguments);
		};
	})()));

	router.post('/', (0, _expressAsyncHandler2.default)((() => {
		var _ref5 = _asyncToGenerator(function* (req, res) {
			const person = new _person2.default(req.body);
			const newPerson = yield person.save();
			res.json(newPerson);
		});

		return function (_x9, _x10) {
			return _ref5.apply(this, arguments);
		};
	})()));

	return router;
};
//# sourceMappingURL=persons.js.map