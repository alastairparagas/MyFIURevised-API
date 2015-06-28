(function (global) {
	'use strict';
	
	require('app-module-path').addPath(__dirname);
	
	var express = require('express'),
		missingRouteMiddleware = 
			require('api/middlewares/missingRouteMiddleware'), 
		apiRoutes = require('api/routes'),
		config = require('api/config'),
		
		app = express();
		
	
	app.use('/api/v1', apiRoutes);
	app.use(missingRouteMiddleware);
	
	app.listen(config.port, function () {
		global.console.log("App listening at port " + config.port);	
	});
	
}(global));