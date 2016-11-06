//http://www.jqueryscript.net/demo/Simple-Animated-jQuery-Select-Menu-Plugin-Select-Extended/

angular.module('MyApp', [])

.controller('MainController', function MainController($http, $timeout, $scope) {

    var self = this;

    this.valueToSet = '';
    this.currentValue = {};

    $http.get('states.json').then(function(response){
        self.states = response.data;
        $timeout(function(){
            $("#select").selectX({
                onSelect: function (selectedVal) {

                   self.currentValue = {};
                    $scope.$apply(function(){
                        Object.assign(self.currentValue, selectedVal);
                    });
                    console.log(selectedVal);
                }
            });
        }, 0);
    });

    this.setValue = function(value) {
            var $input = $('#select .input'),
                $text = $('.trigger-text'),
                $targetLi = $("#select ul li[value=" + value + "]");
            // set input value
            $input.val(value);

            // change trigger text and change item class
            $text.text($targetLi.text());
            $targetLi.addClass("selected").siblings().removeClass("selected");

        self.currentValue = {
                label: $targetLi.text(),
                value: value
            };
    };

    this.getValue = function() {
        console.log(self.currentValue);
        return self.currentValue;
    }
});

