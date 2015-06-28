(function (global) {
	'use strict';

	var validateCredentials = require('api/models/validateCredentials'),
		apiView = require('api/views/apiView');

	/**
	* @module api/controllers
	* @name studentPostAuth
	* @description Validates student credentials given the provided 
	*	credentials on POST. On validation of student credentials, 
	*	store credentials on session.
	* @param {Object} req - Express Request object
	* @param {Object} res - Express Response object
	*/
	function studentPostAuth(req, res) {
		var fiuUserId = req.body && req.body.fiuUserId, 
			fiuUserPassword = req.body && req.body.fiuUserPassword;

		function successCallback() {
			req.session.fiuUserId = fiuUserId;
			req.session.fiuUserPassword = fiuUserPassword;

			apiView(res, {
				message: "Succesfully authenticated student"
			});
		}
		function errorCallback() {
			apiView(res, {
				status: 400,
				message: "Incorrect Student Credentials"
			});
		}

		validateCredentials(fiuUserId, fiuUserPassword)
			.then(successCallback, errorCallback);
	}

	module.exports = studentPostAuth;

}(global));