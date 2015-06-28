(function (global) {
	'use strict';
	
	var express = require('express');
	
	/**
	* @module api
	* @name config
	* @description Configuration settings for our API. All of the properties/
	*	methods defined here must be specified if you plan to spin your own
	*	myFiuRevised server instance.
	*/
	var config = {
		BodyParser: {
			extended: false	
		},
		ExpressSession: {
			cookie: {},
			name: "myfiurevised.session",
			secret: "kKCSgEY3xFNN2rBArfyEX6QjkC5LCJ",
			resave: true,
			saveUninitialized: false
		},
		Spooky: {
			child: {
				transport: 'http'	
			},
			casper: {
				userAgent: "Mozilla/5.0 (X11; Linux x86_64) " + 
					"AppleWebKit/537.36 (KHTML, like Gecko) " + 
					"Chrome/43.0.2357.125 Safari/537.36",
				XSSAuditingEnabled: true,
				loadImages: false,
				loadPlugins: false
			}
		},
		port: 8000
	};
	
	if (express().get('env') === 'production') {
		config.ExpressSession.cookie.secure = true;
	}
	
	module.exports = config;
	
}(global));