(function (global) {
	'use strict';

	var studentMessages = require('api/models/studentMessages'),
		apiView = require('api/views/apiView');

	/**
	* @module api/controllers
	* @name studentGetMessages
	* @description Gets the dashboard messages of the student, using 
	*	his/her stored session credentials.
	* @param {Object} req - Express Request object
	* @param {Object} res - Express Response object
	*/
	function studentGetMessages(req, res) {
		function successCallback(messagesData) {
			apiView(res, {
				message: "Succesfully retrieved messages",
				data: messagesData
			});
		}
		function errorCallback() {
			apiView(res, {
				status: 400,
				message: "Could not grab messages"
			});
		}

		studentMessages(req.session.fiuUserId && 
						req.session.fiuUserPassword)
			.then(successCallback, errorCallback);
	}

	module.exports = studentGetMessages;

}(global));