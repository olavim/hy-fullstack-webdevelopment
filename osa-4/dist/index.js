'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator(function* () {
	if (process.env.NODE_ENV !== 'production') {
		_dotenv2.default.load();
		console.log('Loaded env');
	}

	_mongoose2.default.connect(process.env.MONGODB_URI);

	// For testing purposes.
	if (process.env.NODE_ENV === 'development' && !(yield _user2.default.findOne({ username: 'superuser' }))) {
		const passwordHash = yield _bcrypt2.default.hash('foofum', 10);
		const superuser = new _user2.default({ username: 'superuser', name: 'Superman', passwordHash });
		yield superuser.save();
	}

	const server = (0, _app2.default)();
	const port = process.env.PORT || 3003;

	server.listen(port, function () {
		console.log(`Server running on port ${port}`);
	});
})();
//# sourceMappingURL=index.js.map