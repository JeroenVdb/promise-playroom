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

setFirstPartyUrls(person)
	.then(analyzeAllEntries, throwError)
	.then(sendMessage, throwError);
