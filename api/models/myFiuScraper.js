(function (global) {
	'use strict';
	
	var Spooky = require('spooky'),
		config = require('../config');
	
	function myFiuScraper(spookyListener) {
		
		function initSpooky(resolve, reject) {
			var spookyBrowser = new Spooky({
				child: {
					transport: 'http'
				},
				casper: {
					pageSettings: {
						userAgent: config.userAgent,
						XSSAuditingEnabled: true,
						loadImages: false,
						loadPlugins: false
					}
				}
			}, function (error) {
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
				console.log(error);
			});
		}
		
		return new Promise(initSpooky);
	}
	
	module.exports = myFiuScraper;
	
}(global));