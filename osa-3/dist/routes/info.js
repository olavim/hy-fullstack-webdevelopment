'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (resources) {
	const router = _express2.default.Router();

	router.get('/', (req, res) => {
		res.render('info', {
			numPersons: resources.persons.length,
			time: new Date().toString()
		});
	});

	return router;
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=info.js.map