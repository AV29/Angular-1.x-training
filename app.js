
angular.module('MyApp', ['LogService']);

angular.module('MyApp')
.directive('mainInformation', function(){
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'main-information.html',
        bindToController: true,
        controllerAs: 'mainInformation',
        controller: ['Logger', function( Logger) {
           var self = this,
               message = 'Hello!!!';
               this.counter = Logger.counter;
               self.incrementCounterInService = function() {
                  Logger.logOut(message);
                  Logger.counter++;
                  self.counter = Logger.counter;
               }

            self.resetCounter = function(){
                Logger.counter = 0;
                self.counter = Logger.counter;
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
         controller: ['Logger', function(Logger) {
               var self = this;
               self.counter = 0;
               self.Logger = Logger;
        }]
    }
});



