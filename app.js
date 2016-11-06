angular.module('MyApp', [])

.controller('MainController', function MainController($http) {

    var self = this;
    $http.get('states.json').then(function(response){
        self.states = response.data;

        //$(".js-example-basic-single").select2({
        //    placeholder: "Select a state",
        //    allowClear: true
        //});
    });



    $(".js-example-basic-single").on("select2:select", function (e) { console.log("select2:select", e); }); // event trigger


});


//  getValue()  $('select').val();
//  setValue()  $("select").val("WY").trigger("change");