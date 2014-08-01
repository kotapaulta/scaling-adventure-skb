/* global angular, $scope */

(function () {
  'use strict';
  angular.module('skbApp',[])
    .config(['$locationProvider', '$httpProvider',
      function($locationProvider, $httpProvider){
        $locationProvider.html5Mode(true);
      }
    ])
    .controller('SumController', ['$scope', '$rootScope', function($scope,$rootScope) {
      $scope.prices = [];

      $scope.addString = function(){
        angular.forEach($scope.prices, function(price) {
          console.log('price is:', price);
          price.status = 'ok';
        });
        $scope.prices.unshift({
          price:0,
          status: 'editing'
        });
      };

      $scope.removeString = function(index){
        console.log('index:', index);
        $scope.prices.splice(index, 1);
      };

      $scope.setEditStatus = function(index){
        $scope.prices[index].status = 'editing';
      };

      $scope.setOkStatus = function(index){
        $scope.prices[index].status = 'ok';
      };


      $scope.totalSum = function(){
        var total = 0;
        angular.forEach($scope.prices, function(price) {
          console.log('price is:', price);
          total += parseFloat(price.price) || 0;
        });
        return total;
      };

      $scope.separatePrice = function(price){
        var separated = price;

        return separated;
      };
    }]);


}());
