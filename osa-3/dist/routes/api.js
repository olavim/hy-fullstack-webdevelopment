'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (resources) {
	const router = _express2.default.Router();

	router.get('/:resourceName', (req, res) => {
		const { resourceName } = req.params;
		const resource = resources[resourceName];

		if (!resource) {
			throw { status: 404, message: 'resource does not exist' };
		}

		res.json(resource.data);
	});

	router.get('/:resourceName/:id', (req, res) => {
		const { resourceName, id } = req.params;
		const resource = resources[resourceName];

		if (!resource) {
			throw { status: 404, message: 'resource does not exist' };
		}

		const record = resource.data.find(r => String(r.id) === id);

		if (!record) {
			throw { status: 404, message: 'record does not exist' };
		}

		res.json(record);
	});

	router.delete('/:resourceName/:id', (req, res) => {
		const { resourceName, id } = req.params;
		const resource = resources[resourceName];

		if (!resource) {
			throw { status: 404, message: 'resource does not exist' };
		}

		const recordIndex = resource.data.findIndex(r => String(r.id) === id);

		if (recordIndex < 0) {
			throw { status: 404, message: 'record does not exist' };
		}

		resource.data.splice(recordIndex, 1);
		res.json({ status: 'ok' });
	});

	router.post('/:resourceName', (req, res) => {
		const { resourceName } = req.params;
		const resource = resources[resourceName];

		if (!resource) {
			throw { status: 404, message: 'resource does not exist' };
		}

		const data = (0, _validate2.default)(resource, req.body);

		const id = Math.floor(Math.random() * 1000000000);
		const record = _extends({ id }, data);

		resource.data.push(record);

		res.json(record);
	});

	return router;
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _validate = require('../lib/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=api.js.map