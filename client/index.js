'use strict';

angular.module('bank-account', ['firebase'])
.run(['$rootScope', function($rootScope){
  $rootScope.balance = 10000;
  $rootScope.name = 'Bob Smith';
  $rootScope.overdrafted = false;

}])
.controller('master', ['$rootScope', '$scope', function($rootScope, $scope){
  $scope.deposits = [];
  $scope.withdrawals = [];
  $scope.fees = [];

  $scope.deposit = function(){
    $rootScope.balance += $scope.amount;
    $scope.deposits.push({ amount: $scope.amount, date: new Date() });
    overdraftStatus();
  };
  $scope.withdraw = function(){
    $rootScope.balance -= $scope.amount;
    $scope.withdrawals.push({ amount: $scope.amount, date: new Date() });
    overdraftStatus();
  };
  function overdraftStatus(){
    if($rootScope.balance < 0 && $rootScope.overdrafted === false){
      $scope.fees.push({ amount: 50, date: new Date() });
      $rootScope.balance -= 50;
      $rootScope.overdrafted = true;
    } else if($rootScope.balance > 0 && $rootScope.overdrafted === true){
      $rootScope.overdrafted = false;
    }
  }
}]);
