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
			resolve(randomTime);
			// reject();
		}, randomTime);
	});
}

// Chaining
setFirstPartyUrls(person)
	.then(analyzeAllEntries, throwError)
	.then(sendMessage, throwError);

// Looping order is unknown
function asyncLoop(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
        next: function() {
            if (done) {
                return;
            }

            if (index < iterations) {
                index++;
                func(loop);

            } else {
                done = true;
                callback();
            }
        },

        iteration: function() {
            return index - 1;
        },

        break: function() {
            done = true;
            callback();
        }
    };
    loop.next();
    return loop;
}

asyncLoop(100, function(loop) {

	console.log('Iteration: ' + loop.iteration());

	sendMessageAfterSomeRandomTime(loop.iteration())
		.then(function(time) {
			// console.log('This message timed out: ' + time);
			console.log('Time for this: ' + time);
			loop.next();
		}, function() {
			console.log('Failed');
		});

}, function() {
	console.log('Loop is done, go show the results');
});
