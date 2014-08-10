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
        $scope.shouldBeOpen = true;
        isExtend (true);
      };

      $scope.removeString = function(index){
        $scope.prices.splice(index, 1);
        isExtend (true);
      };

      $scope.setOkStatus = function(index){
        $scope.prices[index].status = 'ok';
        $scope.shouldBeOpen = false;
      };
      $scope.setEditingStatus = function(index){
        angular.forEach($scope.prices, function(price) {
          price.status = 'ok';
        });
        $scope.shouldBeOpen = true;

        $scope.prices[index].status = 'editing';
      };


      $scope.totalSum = function(){
        var total = 0;
        angular.forEach($scope.prices, function(price) {
          total += parseFloat(price.price) || 0;
        });
        total = total.toFixed(2);
        return total;
      };

      $scope.separatePrice = function(price){
        var priceToParse,
            separated,
            inputValue,
            newValue;
        if(price){
          priceToParse = price.toString();
        } else {
          priceToParse = '0';
        }
        separated = priceToParse.replace(/[^\d^\.]/g, '');
        inputValue = separated
          .replace(' ', '')
          .split("")
          .reverse()
          .join("");
        newValue = '';
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
          .replace(/\s$/g,'')
          .replace(/(\d)\s(\.\d{2})/ig, concatTwoSelections);

        if (price < 0){
         separated ='-' + separated;
        }
        function concatTwoSelections (str, p1, p2) {
          return p1 + p2;
        }
        return separated;
      };

      angular.element($window).bind("scroll", function() {
        isExtend();
      });

      function isExtend (noApply){
        var docHeight = $(document).height(),
            windowHeight = $(window).height(),
            scrollTop = $(window).scrollTop(),
            extend = false;
        if(docHeight<=windowHeight){
          extend = false;
        } else {
          extend = !Boolean(windowHeight + scrollTop >= docHeight);
        }

        if(!noApply){
          $scope.$apply(function(){
            $scope.extend = extend;
          });
        } else {
          $scope.extend = extend;
        }
      }
    }])

    .directive('appType', function () {
      return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
          if (attrs.appType === 'number') {
            return ctrl.$parsers.push(function (value) {
              var valid = value === null || isFinite(value);

              ctrl.$setValidity('number', valid);

              return valid && value !== null ? Number(value) : undefined;
            });
          } else {
            return false;
          }
        }
      };
    })
    .directive('focusMe', function($timeout, $parse) {
      return {
        link: function(scope, element, attrs) {
          var model = $parse(attrs.focusMe);
          scope.$watch(model, function(value) {
            if(value === true) {
              $timeout(function() {
                element[0].focus();
              });
            }
          });
        }
      };
    });

}());
