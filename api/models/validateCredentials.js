(function (global) {
	'use strict';

	var myFiuScraper = require('api/models/myFiuScraper');

	/**
	* @name validateCredentials
	* @description Checks to see if the user with the provided userId and 
	*	userPassword actually exists in MyFIU
	* @param {string} userId - Panther ID of the student
	* @param {string} userPassword - Password of the student
	* @returns {Object} Promise
	*/
	function validateCredentials(userId, userPassword) {

		function authInit(resolve, reject) {
			if (!userId || !userPassword) {
				reject();
			}

			if (userId.length !== 7) {
				reject();
			}

			function scraperInit(scraper) {
				var spooky = scraper.spookyBrowser;
				
				spooky.on('auth', function (message) {
					if (message === "error") {
						reject();
					} else {
						resolve();	
					}
				});
				
				spooky.then([{
					userId: userId,
					userPassword: userPassword
				}, function () {
					this.fill("#login form", {
						"userid": userId,
						"pwd": userPassword
					}, true);
				}]);
				spooky.then(function () {
					if (this.exists("#warning #login_error")) {
						this.emit('auth', 'error');
					} else {
						this.emit('auth', 'success');	
					}
				});
				
				spooky.run();
			}
			
			myFiuScraper().then(scraperInit);
		}

		return new Promise(authInit);
	}

	module.exports = validateCredentials;

}(global));