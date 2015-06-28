(function (global) {
	'use strict';
	
	/**
	* @module api
	* @name routes
	* @description Defines the global API routes as well as sets up the 
	*	various middlewares of our API.
	*/
	
	var express = require('express'),
		config = require('api/config'),
		router = express.Router(),
		
		expressSessionMiddleware = require('express-session'),
		bodyParserMiddleware = require('body-parser'),
		authMiddleware = require('api/middlewares/authMiddleware'),
		
		studentPostAuth = require('api/controllers/studentPostAuth'),
		studentGetGpa = require('api/controllers/studentGetGpa'),
		studentGetMessages = require('api/controllers/studentGetMessages'),
		studentGetSchedule = require('api/controllers/studentGetSchedule');
	
	
	router.use(expressSessionMiddleware(config.ExpressSession));
	router.use(bodyParserMiddleware.urlencoded(config.BodyParser));
	router.use(bodyParserMiddleware.json());
	router.use('/student', authMiddleware);
	
	router.post('/auth', studentPostAuth);
	router.get('/student/gpa', studentGetGpa);
	router.get('/student/messages', studentGetMessages);
	router.get('/student/schedule', studentGetSchedule);
	
	module.exports = router;
	
}(global));