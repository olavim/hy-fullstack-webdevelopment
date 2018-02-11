'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (resources) {
	const router = _express2.default.Router();
	router.use('/api', (0, _api2.default)(resources));
	router.use('/info', (0, _info2.default)(resources));
	return router;
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _info = require('./info');

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map