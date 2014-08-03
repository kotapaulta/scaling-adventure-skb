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

      $scope.setOkStatus = function(index){
        $scope.prices[index].status = 'ok';
      };
      $scope.setEditingStatus = function(index){
        if($scope.prices[index].status === 'ok'){
          $scope.prices[index].status = 'editing';
        }
      };


      $scope.totalSum = function(){
        var total = 0;
        angular.forEach($scope.prices, function(price) {
          console.log('price is:', price);
          total += parseInt(price.price, 10) || 0;
        });
        return total;
      };

      $scope.separatePrice = function(price){
        var priceToParse;
        if(price){
          priceToParse = price.toString();
        } else {
          priceToParse = '0';
        }
        var separated = priceToParse.replace(/\D/g, '');
        var inputValue = separated
          .replace(' ', '')
          .split("")
          .reverse()
          .join("");
        var newValue = '';
        for (var i = 0; i < inputValue.length; i++) {
          if (i % 3 === 0) {
            newValue += ' ';
          }
          newValue += inputValue[i];
        }
        separated = newValue
          .split("")
          .reverse()
          .join("")
          .replace(/\s$/g,'');

        if (price < 0){
         separated ='-' + separated;
        }
        return separated;
      };
    }])

    .directive('appType', function () {
      return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          // Custom number validation logic.
          if (attrs.appType === 'number') {
            return ctrl.$parsers.push(function (value) {
              var valid = value === null || isFinite(value);

              ctrl.$setValidity('number', valid);

              return valid && value !== null ? Number(value) : undefined;
            });
          }
        }
      };
    });


}());
