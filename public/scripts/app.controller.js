var app = angular.module('Dashboard');

/*factory('getData', function($resource){
  return $resource('/api/:query');
})*/

angular.module('Dashboard').controller('dashboardController', ['$http', '$scope', function($http, $scope){
  $http({
    url: '/dashboard',
    method: 'post',
    data: {username: 'chethan749'}
  }).then(function(data){
      $scope.details = data.data[0];
      console.log($scope.details);
  }, function(err){});
}]);

angular.module('Dashboard').controller('transactionsController', ['$http', '$scope', function($http, $scope){
  $scope.start_date = '';
  $scope.end_date = '';
  $scope.get_transactions = function(){
    var start = new Date($scope.start_date);
    var end = new Date($scope.end_date);
    console.log(start, end);
    $http({
      url: '/transactions',
      method: 'post',
      data: {start: $scope.start_date,
            end: $scope.end_date}
    }).then(function(data){
        $scope.details = data.data;
        console.log($scope.details);
    }, function(err){});
  }
}]);
