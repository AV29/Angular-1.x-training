
angular.module('MyApp', []);

angular.module('MyApp')
.directive('mainInformation', function(){
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'main-information.html',
        bindToController: true,
        controllerAs: 'mainInformation',
        controller: ['$rootScope', function($rootScope) {
           var self = this,
           	   message = 'message from RootScope eventEmmiter';	

           self.pressTheButton = function(){
           		$rootScope.$broadcast('pressButtonEvent', message);
           }
        }]
    }
})
.directive('informationChunk', function() {
    return {
        restrict: 'E',
        scope:{
        },
        templateUrl: 'information-chunk.html',
        bindToController: true,
        controllerAs: 'informationChunk',
         controller: ['$scope', '$interval', function($scope, $interval) {
           var self = this,
           	   start = null;
           $scope.$on('pressButtonEvent', function(event, message){

           	if(start) {
           	  $interval.cancel(start);
            }
           	console.log(message);
           	self.message = message;

           	start = $interval(function(){self.message = '';}, 1000);
           });

           
        }]
    }
});



