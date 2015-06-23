(function (global) {
	'use strict';
	
	var express = require('express'),
		missingRouteMiddleware = require('./api/middlewares/missingRoute'), 
		app = express(),
		api = require('./api/routes');
	
	app.use('/api/v1', api);
	app.use(missingRouteMiddleware);
	
	app.listen(8000, function () {
		global.console.log("App listening at port 8000");	
	});
	
}(global));