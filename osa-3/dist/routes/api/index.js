'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _persons = require('./persons');

var _persons2 = _interopRequireDefault(_persons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
	const router = _express2.default.Router();
	router.use('/persons', (0, _persons2.default)());

	return router;
};
//# sourceMappingURL=index.js.map