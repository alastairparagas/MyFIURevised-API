(function (global) {
	'use strict';
	
	var apiView = require('../views/api');
	
	function missingRouteMiddleware(req, res) {
		apiView(res, {
			status: 404,
			message: "That API endpoint does not exist."
		});
	}
	
	module.exports = missingRouteMiddleware;
	
}(global));