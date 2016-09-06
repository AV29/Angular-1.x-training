
angular.module('MyApp', []).run(function($rootScope) {
    $rootScope.isOpened = false;
    $rootScope.openModal = function(){
        $rootScope.isOpened = true;
    };
    $rootScope.closeModal = function(){
        $rootScope.isOpened = false;
    };
})
    .directive('modalWindow', function(){
        return {
            restrict: 'E',
            scope: {
                title: '@',
                actionCallback: '&'
            },
            transclude: true,
            template: '<div class="modal-wrapper" >' +
                            '<div class="modal-close-trigger">' +
                                '<a ng-click="closeModal()" class="close"></a>' +
                            '</div>' +
                            '<div class="modal-title">{{title}}</div>' +
                            '<div class="modal-content">' +
                                '<ng-transclude></ng-transclude>' +
                            '</div>' +
                      '</div>',
            link: function (scope, element, attrs) {

            }
        }
    })
.controller('ParentController1', function ParentController1($scope){
        $scope.title = 'Parent Controller 1 modal window';
})

.controller('ParentController2', function ParentController2($scope){
        $scope.title = 'Parent Controller 2 modal window';
})

.controller('ChildController1', function ChildController1($scope){
        $scope.title = 'Child Controller 1 modal window';
});

