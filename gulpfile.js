(function (global) {
	'use strict';
	
	var gulp = require('gulp'),
		mocha = require('gulp-mocha'),
		watch = require('gulp-watch'),
		jshint = require('gulp-jshint'),
		jshintStylish = require('jshint-stylish');
	
	
	function jshintTask() {
		return gulp.src([
				'api/**/*.js',
				'tests/**/*.js',
				'server.js'
			])
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStylish));	
	}
	
	gulp.task('jshint', function () {
		return jshintTask();
	});
	
	gulp.task('jshintWatch', function () {
		watch('**/*.js', function () {
			global.console.log('JsHint Re-run ------------------>');
			jshintTask();
		});
	});
	

	function testTask() {
		return gulp.src('./tests/unit/**/*.js')
			.pipe(mocha())
			.once('error', function () {
				process.exit(1);
			})
			.once('end', function () {
				process.exit();
			});
	}
	
	gulp.task('test', function () {
		return testTask();
	});
	
	gulp.task('testWatch', function () {
		watch('**/*.js', function () {
			global.console.log('Tests Re-run ------------------>');
			testTask();
		});
	});
	
	
	gulp.task('default', ['test']);
	
}(global));