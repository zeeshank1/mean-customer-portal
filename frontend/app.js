var app = angular.module("app", ["ngRoute"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when("/addcustomer", {
        url: '/addcustomer',
        templateUrl: "addcustomer.html",
        controller: "customers"
    }).
    when("/customers", {
        url: '/customers',
        templateUrl: 'customers.html',
        controller: "customers"
    }).
    when("/editcustomer", {
        url: '/editcustomer',
        templateUrl: 'editcustomer.html',
        controller: "customers"
    }).
    otherwise({
        redirectTo: '/customers'
    });
}]);




app.controller('customers', function($window, $scope, $rootScope, $location, $http) {

    $scope.user = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };

    $scope.init = function() {

        var jsonData = {};
        $http({
            method: 'GET',
            url: '/customers',
            contentType: 'application/x-www-form-urlencoded',
            data: jsonData
        }).success(function(data) {
            $scope.tableData = data.data;
        }).error(function(data) {
            console.log(data);
        });
    };

    $scope.init();
    
    $scope.cancelAdd = function() {
        
        $location.path("/customers");
    };

    $scope.edit = function(user) {
        
        $rootScope.final2 = user;        
        $location.path("/editcustomer");
    };

    $scope.saveEdit = function(id) {
        
        $http({
            method: 'POST',
            url: '/saveeditcustomer',
            contentType: 'application/x-www-form-urlencoded',
            data: $scope.final2
        }).success(function(data) {            
            $location.path("/customers");
        }).error(function(data) {    
            console.log(data);
        });
    };

    $scope.addcustomer = function() {
        
        $http({
            method: 'POST',
            url: '/savecustomer',
            contentType: 'application/x-www-form-urlencoded',
            data: $scope.user
        }).success(function(data) {
            console.log("Sucess add customer");
            console.log(JSON.stringify(data));
            $location.path("/customers");
        }).error(function(data) {
            console.log("Zeeshn3 Failed Add customer");
            console.log(data);
        });
    };
    $scope.deletecustomer = function(id) {        
        
        var jsonData = {};

        $http({
            method: 'DELETE',
            url: '/deletecustomer/' + id,
            contentType: 'application/x-www-form-urlencoded',
            data: jsonData

        }).success(function(data) {

            $location.path("/customers");            
            $scope.tableData = _.reject($scope.tableData, function(user) {
                return user.id == id
            });

        }).error(function(data) {            
            console.log(data);
        });
    };
});
