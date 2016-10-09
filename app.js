
angular.module('MyApp', []);


angular.module('MyApp')
    .directive('tabControl', function(){
        return {
            restrict: 'E',
            scope: {
            },
            transclude: true,
            replace: true,
            templateUrl: 'tabControl.html',
            bindToController: true,
            controllerAs: 'tabControl',
            controller: function() {
                var self = this;
                self.tabs = [];
                self.register = function register(tab){
                    self.tabs.push(tab);
                    if(self.tabs.length === 1) {
                        tab.active = true
                    }
                };
                self.switchTab = function(selectedTab){
                    angular.forEach(self.tabs, function (eachTab) {
                        if(eachTab.active && (eachTab != selectedTab)) {
                            eachTab.active = false;
                        }
                    });
                    selectedTab.active = true;
                };
            }
        }
    })
    .directive('pane', function(){
        return {
            restrict: 'E',
            require: '^tabControl',
            scope:{
                name: '@'
            },
            transclude: true,
            replace: true,
            template: '<div class="pane-wrapper" ng-show="active" ng-transclude></div>',
            link: function(scope, element, attrs, tabsCtrl) {
                scope.active = false;
                tabsCtrl.register(scope);
            }
        }
    });



