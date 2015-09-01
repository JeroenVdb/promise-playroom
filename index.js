'use strict';

var Promise = require('promise');

console.log('Welcome to my promise test');

var person = {
	name: 'Van den Berghe',
	firstName: 'Jeroen'
}


function setFirstPartyUrls(person) {
	return new Promise(function(resolve, reject) {
		console.log('setFirstPartyUrls: ' + person.firstName + '... ' + person.name);
		resolve(person);
		// reject();
	});
}

function analyzeAllEntries(person) {
	return new Promise(function(resolve, reject) {
		console.log('analyzeAllEntries: ' + person.firstName + '... ' + person.name);
		var test = setTimeout(function() {
			console.log('entries analyzed');
			resolve(person);
			// reject();
		}, 3000);
	});
}

function throwError() {
	return new Promise(function(resolve, reject) {
		console.log('show errorpage');
	});
}

function sendMessage(person) {
	return new Promise(function(resolve, reject) {
		console.log('sendMessage: ' + person.firstName + '... ' + person.name);
	});
}

function sendMessageAfterSomeRandomTime(it) {
	return new Promise(function(resolve, reject) {
		var randomTime = Math.floor(Math.random() * (10000 - 1) + 1);
		var messageTimeout = setTimeout(function() {
			console.log('Iteration: ' + it);
			console.log('Took some time: ' + randomTime);
			resolve(it);
			// reject();
		}, randomTime);
	});
}

// Chaining
setFirstPartyUrls(person)
	.then(analyzeAllEntries, throwError)
	.then(sendMessage, throwError);

// Looping order is unknown
var i = 0;
for (i = 0; i < 100; i++) {

	console.log('Iteration: ' + i);

	sendMessageAfterSomeRandomTime(i)
		.then(function(it) {
			// console.log('This message timed out: ' + time);
			console.log('Iteration: ' + it);
		}, function() {
			console.log('Failed');
		});
}
