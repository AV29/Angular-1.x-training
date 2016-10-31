angular.module('MyApp', []);

angular.module('MyApp')
    .directive('mainInformation', function () {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: 'main-information.html',
            bindToController: true,
            controllerAs: 'mainInformation',
            controller: function ($rootScope, $interval, $scope) {
                var self = this,
                    message = 'message from RootScope eventEmmiter';

                self.pressTheButton = function () {
                    $rootScope.$broadcast('broadCastEvent', message);
                }

                $scope.$on('emmitEvent', function(event, message) {
                    if (self.start) {
                        $interval.cancel(self.start);
                    }
                    console.log(message);
                    self.message = message;

                    self.start = $interval(function () {
                        self.message = '';
                    }, 2000);
                });
            }
        }
    })
    .directive('informationChunk', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'information-chunk.html',
            bindToController: true,
            controllerAs: 'informationChunk',
            controller: function ($scope, $interval) {
                var self = this,
                    message = 'Message from below ))'
                    start = null;
                $scope.$on('broadCastEvent', function (event, message) {

                    if (self.start) {
                        $interval.cancel(self.start);
                    }
                    console.log(message);
                    self.message = message;

                    self.start = $interval(function () {
                        self.message = '';
                    }, 2000);
                });

                self.pressTheButton = function() {
                  $scope.$emit('emmitEvent', message);
                };

            }
        }
    });



