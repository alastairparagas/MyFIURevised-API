(function (global) {
	'use strict';

	var studentGpa = require('api/models/studentGpa'),
		apiView = require('api/views/apiView');

	/**
	* @module api/controllers
	* @name studentGetGpa
	* @description Gets GPA data of student using the stored session 
	*	credentials of the student.
	* @param {Object} req - Express Request Object
	* @param {Object} res - Express Response Object
	*/
	function studentGetGpa(req, res) {
		function successCallback(gpaData) {
			apiView(res, {
				message: "Succesfully retrieved GPA data", 
				data: gpaData
			});	
		}
		function errorCallback() {
			apiView(res, {
				status: 400,
				message: "Could not grab GPA data"
			});
		}

		studentGpa(req.session.fiuUserId && 
				   req.session.fiuUserPassword)
			.then(successCallback, errorCallback);
	}

	module.exports = studentGetGpa;

}(global));