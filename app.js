angular.module('MyApp', [])

    .controller('DigestTaskController', function DigestTaskController($scope, $timeout, $http) {

        var self = this,
            timeout = 300,
            styles = getComputedStyle(document.documentElement),
            increment = function () {
                self.counter += 1;
                console.log('The actual value of counter is: ' + self.counter);
            },
            fetchViaHttp = function (url) {
                return new Promise(function (resolve, reject) {

                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.send();

                    xhr.onload = function () {
                        if (this.status == 200) {
                            var responseData = JSON.parse(this.responseText);
                            resolve(responseData);
                        } else {
                            var error = new Error(this.statusText);
                            error.code = this.status;
                            reject(error);
                        }
                        xhr.onerror = function () {
                            reject(new Error("Network Error"));
                        };
                    };
                });
            },
            setDocumentVariable = function (propertyName, value) {
                document.documentElement.style.setProperty(propertyName, value);
            };

        this.counter = 0;

        this.changeColorTheme = function()
        {
            var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

            setDocumentVariable('--primaryColor', randomColor);
            setDocumentVariable('--secondaryColor', randomColor);
        }
        ;

        this.clearData = function () {
            self.data = null;
        };

        this.reset = function () {
            self.counter = 0;
            if (self.data) {
                self.data = null;
            }
        };

        document.querySelector('.onclick').addEventListener('click', function () {
            increment();
        });

        document.querySelector('.onclick-with-digest').addEventListener('click', function () {
            $scope.$apply(function () {
                increment();
            });
        });

        this.ngClickIncrement = function () {
            increment();
        };

        this.setTimeoutIncrement = function () {
            setTimeout(increment, timeout);
        };

        this.$timeoutIncrement = function () {
            $timeout(increment, timeout);
        };

        this.setTimeoutIncrementWithApply = function () {
            setTimeout(function () {
                $scope.$apply(function () {
                    increment();
                })
            }, timeout);
        };

        this.fetchViaNativeHttp = function () {
            fetchViaHttp('data.json').then(function (responce) {
                self.data = responce;
                increment();
            });
        };

        this.fetchVia$http = function () {
            $http.get('data.json').then(function (responce) {
                self.data = responce.data;
                increment();
            });
        };

        this.fetchViaNativeHttpWithApply = function () {
            fetchViaHttp('data.json').then(function (responce) {

                $scope.$apply(function () {
                    self.data = responce;
                    increment();
                });
            });
        };
    });
