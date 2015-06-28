(function (global) {
	'use strict';
	
	/**
	* @module api/views
	* @name apiView
	* @description API layer View for our app.
	* @param {Object} responseStream - Express 'response' object whose output 
	*	is being constructed.
	* @param {Object} respOptions - Configuration for the constructed output. 
	*	Option properties include `status`, `message` and `data`.
	*/
	function apiView(responseStream, respOptions) {
		var hasResponseStatus = false,
			hasResponseMessage = false,
			hasResponseData = false,
			apiOutput = {};
		
		if (respOptions && typeof respOptions === "object") {
			hasResponseStatus = "status" in respOptions && 
				(respOptions.status >= 200 || respOptions.status <= 499);
			hasResponseMessage = "message" in respOptions;
			hasResponseData = "data" in respOptions &&
				typeof respOptions.data === "object";
		}
		
		/*
			By default, API will return a 200 status unless an explicit 
			status is provided. If an explicit message "error" is issued, 
			a 400 status code will be issued.
		*/
		apiOutput.status = 200;
		if (hasResponseStatus) {
			apiOutput.status = respOptions.status;
		} else {
			if (hasResponseMessage && 
				respOptions.message.toLowerCase() === "error") {
				apiOutput.status = 400;	
			}
		}
		
		/*
			By default, API will return a "Success" message unless an explicit 
			message is provided. If an explicit status in the 400s is issued, 
			an "Error" message will be issued.
		*/
		apiOutput.message = "Success";
		if (hasResponseMessage) {
			apiOutput.message = respOptions.message;
		} else {
			if (hasResponseStatus && 
				(respOptions.status >= 400 && respOptions.status <= 499)) {
				apiOutput.message = "Error";	
			}
		}
		
		apiOutput.data = {};
		if (hasResponseData) {
			apiOutput.data = respOptions.data;
		}
		
		return responseStream
			.status(apiOutput.status)
			.json(apiOutput);
	}
	
	module.exports = apiView;
	
}(global));