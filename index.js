'use strict';

var Promise = require('promise');

console.log('Welcome to my promise test');

var promise = new Promise(setFirstPartyUrls);

promise
	.then(analyzeAllEntries, throwError)
	.then(sendMessage, throwError);

function setFirstPartyUrls(resolve, reject) {
	console.log('Find all first party urls: set documentroot as one + those from the textbox');
	resolve();
	// reject();
}

var analyzeAllEntries = new Promise(function(resolve, reject) {
	console.log('lets analyze all entries');
	var test = setTimeout(function() {
		console.log('entries analyzed');
		resolve();
		// reject();
	}, 3000);
});

function throwError() {
	console.log('show errorpage');
}

function sendMessage() {
	console.log('some message');
}
