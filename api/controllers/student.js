(function (global) {

	var validateCredentials = require('../models/validateCredentials'), 
		studentGpa = require('../models/studentGpa'), 
		studentMessages = require('../models/studentMessages'),
		studentSchedule = require('../models/studentSchedule'),
		apiView = require('../views/api');
	
	var studentController = {
		
		postAuth: function auth(req, res) {
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
		},
		
		getGpa: function gpa(req, res) {
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
		},
		
		getMessages: function messages(req, res) {
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
		},
		
		getSchedule: function schedule(req, res) {
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
		
	};
	
	module.exports = studentController;
	
}(global));