angular.module('MyApp')
    .controller('MainController', function MainController($http, $scope) {
        var self = this;
        this.selectedValue = '';
        this.valueToSet = '';
        this.isErrorMessageShown = false;
        $http.get('states.json').then(function (response) {
            self.states = response.data;
        });
        this.setValue = function(val) {
            if(val) {
                self.selectedValue = val;
            }
        };

        this.showMessage = function(isShown) {
            self.isErrorMessageShown = isShown;
        };
    });