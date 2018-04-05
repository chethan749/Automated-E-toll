angular.module('Dashboard').config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'dashboard.html',
    controller: 'dashboardController'
  })
  .when('/transactions', {
    templateUrl: 'transactions.html',
    controller: 'transactionsController'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
