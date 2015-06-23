(function (global) {
	'use strict';
	
	var express = require('express'),
		session = require('express-session'),
		bodyParser = require('body-parser'),
		studentController = require('./controllers/student'),
		authMiddleware = require('./middlewares/auth'),  
		router = express.Router(), 
		sessionOptions = {
			cookie: {}
		},
		bodyParserOptions = {};
	
	sessionOptions.name = "myfiurevised.session";
	sessionOptions.secret = "kKCSgEY3xFNN2rBArfyEX6QjkC5LCJ";
	sessionOptions.resave = true;
	sessionOptions.saveUninitialized = false;
	bodyParserOptions.extended = false;
	
	if (express().get('env') === 'production') {
		sessionOptions.cookie.secure = true;
	}
	
	router.use(session(sessionOptions));
	router.use(bodyParser.urlencoded(bodyParserOptions));
	router.use(bodyParser.json());
	router.use('/student', authMiddleware);
	
	router.post('/auth', studentController.postAuth);
	router.get('/student/gpa', studentController.getGpa);
	router.get('/student/messages', studentController.getMessages);
	router.get('/student/schedule', studentController.getSchedule);
	
	module.exports = router;
	
}(global));