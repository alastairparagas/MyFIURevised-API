(function (global) {
	'use strict';

	var studentSchedule = require('api/models/studentSchedule'),
		apiView = require('api/views/apiView');

	/**
	* @module api/controllers
	* @name studentGetSchedule
	* @description Gets the class schedule of the student, using 
	*	his/her stored session credentials.
	* @param {Object} req - Express Request Object
	* @param {Object} res - Express Response Object
	*/
	function studentGetSchedule(req, res) {
		function successCallback(scheduleData) {
			apiView(res, {
				message: "Succesfully retrieved schedule data",
				data: scheduleData
			});
		}
		function errorCallback() {
			apiView(res, {
				status: 400, 
				message: "Could not grab schedule data"
			});
		}

		studentSchedule(req.session.fiuUserId && 
						req.session.fiuUserPassword)
			.then(successCallback, errorCallback);
	}

	module.exports = studentGetSchedule;

}(global));