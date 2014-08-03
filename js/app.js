/* global angular, $scope, $*/

(function () {
  'use strict';
  angular.module('skbApp',[])
    .config(['$locationProvider',
      function($locationProvider){
        $locationProvider.html5Mode(true);
      }
    ])
    .controller('SumController', ['$scope', '$window', function($scope,$window) {
      $scope.prices = [];
      $scope.extend = false;

      $scope.addString = function(){
        angular.forEach($scope.prices, function(price) {
          price.status = 'ok';
        });
        $scope.prices.unshift({
          price:0,
          status: 'editing'
        });
        isExtend (true);
      };

      $scope.removeString = function(index){
        $scope.prices.splice(index, 1);
        isExtend (true);
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

      function isExtend (noApply){
        var docHeight = $(document).height(),
          windowHeight = $(window).height(),
          scrollTop = document.documentElement.getElementsByTagName('body')[0].scrollTop;

        if(docHeight<=windowHeight){

          if(!noApply){
            $scope.$apply(function(){
              $scope.extend = false;
            });
          } else {
            $scope.extend = false;
          }

        } else if(windowHeight + scrollTop >= docHeight){
          if(!noApply){
            $scope.$apply(function(){
              $scope.extend = false;
            });
          } else {
            $scope.extend = false;
          }
        } else {
          if(!noApply){
            $scope.$apply(function(){
              $scope.extend = true;
            });
          } else {
            $scope.extend = true;
          }
        }
      }

      angular.element($window).bind("scroll", function() {
        isExtend();
      });
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
