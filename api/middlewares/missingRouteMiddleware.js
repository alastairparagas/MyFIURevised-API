(function (global) {
	'use strict';
	
	var apiView = require('api/views/apiView');
	
	/**
	* @module api/middlewares
	* @name missingRouteMiddleware
	* @description Missing Route Middleware for our API. Handles what happens 
	*	the route a consumer is trying to access, does not exist.
	* @param {Object} req - Express Request Object
	* @param {Object} res - Express Response Object
	*/
	function missingRouteMiddleware(req, res) {
		apiView(res, {
			status: 404,
			message: "That API endpoint does not exist."
		});
	}
	
	module.exports = missingRouteMiddleware;
	
}(global));