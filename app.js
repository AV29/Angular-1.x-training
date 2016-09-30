
angular.module('MyApp', []).run(function($rootScope) {
    $rootScope.openModal = function(){
        this.isOpened = true;
    };
    $rootScope.doSomeMagic = function(){
      console.log("It's a Kind of Magic!!!");
    };
});


angular.module('MyApp').directive('modalWindow', function(){
        return {
            restrict: 'E',
            scope: {
                title: '@',
                actionCallback: '&',
                showModal: '='
            },
            transclude: true,
            template: '<div class="overlay" ng-show="showModal"></div>'+
                      '<div class="modal-wrapper" ng-show="showModal">' +
                            '<div class="modal-close-trigger">' +
                                '<a ng-click="closeModal()" class="close"></a>' +
                            '</div>' +
                            '<div class="modal-title">{{title}}</div>' +
                            '<div class="modal-content">' +
                                '<ng-transclude></ng-transclude>' +
                            '</div>' +
                      '</div>',
            link: function(scope, element, attrs) {
                scope.closeModal = function(){
                    scope.showModal = false;
                    scope.actionCallback({value: 'Message form modal!!'});
                }    
            }
        }
    });


angular.module('MyApp').controller('ParentController1', function ParentController1($scope){
        $scope.title = 'Parent Controller 1 modal window';
        $scope.isOpened = false;
        $scope.onModalClosed = function(message){
            console.log(message + ' Gonna be closed!');
        };
})

.controller('ParentController2', function ParentController2($scope){
        $scope.title = 'Parent Controller 2 modal window';
        $scope.isOpened = false;
        $scope.onModalClosed = function(message){
            console.log(message + ' I have been closed!');
        };
})

.controller('ChildController1', function ChildController1($scope){
        $scope.title = 'Child Controller 1 modal window';
        $scope.isOpened = false;
        $scope.onModalClosed = function(message){
            console.log(message + ' Ambush! Will close in 3 seconds ))');
        };
});

