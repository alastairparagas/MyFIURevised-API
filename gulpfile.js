(function (global) {
	'use strict';
	
	var gulp = require('gulp'),
		mocha = require('gulp-mocha'),
		watch = require('gulp-watch'),
		jshint = require('gulp-jshint'),
		jshintStylish = require('jshint-stylish'),
		jsdoc = require('gulp-jsdoc'),
		colors = require('colors');
	
	var jshintSrc, testSrc;
	
	jshintSrc = [
		'api/**/*.js',
		'tests/**/*.js',
		'server.js',
		'gulpfile.js'
	];
	
	function jshintTask() {
		return gulp.src(jshintSrc)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStylish));	
	}
	
	gulp.task('jshint', function () {
		return jshintTask();
	});
	
	gulp.task('jshintWatch', function () {
		watch(jshintSrc, function () {
			global.console.log(colors.yellow('JsHint Re-run'));
			jshintTask();
		});
	});
	

	function testTask() {
		return gulp.src(testSrc)
			.pipe(mocha())
			.once('end', function () {
				process.exit();
			});
	}
	
	gulp.task('test', function () {
		return testTask();
	});
	
	gulp.task('testWatch', function () {
		watch(testSrc, function () {
			global.console.log(colors.yellow('Mocha Tests Re-run'));
			testTask();
		});
	});
	
	
	gulp.task('default', ['test']);
	
}(global));