var LogService = angular.module('LogService', [])

.service('Logger', function(){

	this.logOut = function(message){
		console.log('This is a message logged via service: ' + message);
	}

	this.counter = 0;	

});