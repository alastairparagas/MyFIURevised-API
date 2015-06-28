(function (global) {
	'use strict';
	
	var Spooky = require('spooky'),
		config = require('api/config');
	
	/**
	* @module api/models
	* @name myFiuScraper
	* @description Bootstraps SpookyJS to our needs. SpookyJS allows us to 
	*	use CasperJS/PhantomJS in a NodeJS execution context.
	* @returns {Object} Promise
	*/
	
	function myFiuScraper() {
		
		function promiseExecutor(resolve, reject) {
			var spookyBrowser = new Spooky(config.Spooky, function (error) {
				var e;
				if (error) {
					e = new Error('Cannot initialize SpookyJS for scraping');
					e.details = error;
					reject(e);
					throw e;
				}
				
				spookyBrowser.start("https://my.fiu.edu");
				resolve({spookyBrowser: spookyBrowser});
			});
			
			spookyBrowser.on('error', function (error) {
				global.console.log(error);
			});
		}
		
		return new Promise(promiseExecutor);
	}
	
	module.exports = myFiuScraper;
	
}(global));