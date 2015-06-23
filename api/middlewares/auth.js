(function (global) {
	'use strict';
	
	var apiView = require('../views/api');
	
	/**
	* @name authMiddleware
	* @description Authentication Middleware for our API. If the client
	*	has not been authenticated, do not allow the client to access 
	*	guarded paths.
	* @param {Object} req - Express Request Object
	* @param {Object} res - Express Response Object
	* @param {Function} next - Express Next Function
	*/
	function authMiddleware(req, res, next) {
		var resOptions = {},
			userId = req && req.session && req.session.fiuUserId,
			userPassword = req && req.session && req.session.fiuUserPassword;
		
		function unauthorized() {
			resOptions = {};
			resOptions.status = 401;
			resOptions.title = "Unauthorized";
			resOptions.message = 
				"You must have a valid MyFIU account to access such data";
			
			return apiView(res, resOptions);
		}
		
		if (userId && userPassword) {
			if (userId.length === 7 && isFinite(userId)) {
				next();
			} else {
				unauthorized();
			}
		} else {
			unauthorized();
		}
	}
	
	module.exports = authMiddleware;
	
}(global));