angular.module('MyApp')
    .directive('dropdown', function () {
        return {
            restrict: 'E',
            scope: {
                data: '<',
                selectedValue: '=',
                showErrorMessage: '&'
            },
            templateUrl: 'dropdown.html',
            replace: true,
            bindToController: true,
            controllerAs: 'ddl',
            link: function (scope) {
                var self = this;
                scope.$watch(function () {
                        return scope.ddl.data;
                    },
                    function (newVal, oldVal, scope) {
                        if (oldVal === newVal) {
                            return;
                        }
                        $("#select").selectX({
                            onSelect: function (selectedVal) {

                                scope.$apply(function () {
                                    scope.ddl.selectedValue = selectedVal.label;
                                });
                            }
                        });
                    });

                scope.$watch(function () {
                        return scope.ddl.selectedValue;
                    },
                    function (newVal, oldVal, scope) {
                        if (oldVal === newVal) {
                            return;
                        }
                        scope.ddl.setValue(newVal, oldVal);
                    });
            },
            controller: function () {
                var self = this;
                this.recordFound = true;

                this.setValue = function (value, oldValue) {
                    if (!value) {
                        return;
                    }
                    var $input = $('#select .input'),
                        $text = $('.trigger-text'),
                        $targetLi = $("#select ul li[value=" + value + "]");
                    if (!$targetLi.length) {
                        self.showErrorMessage({isShown: true});
                        return;
                    }
                    self.showErrorMessage({isShown: false});
                    $input.val(value);
                    $text.text($targetLi.text());
                    $targetLi.addClass("selected").siblings().removeClass("selected");
                };

            }
        }
    });