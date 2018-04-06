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
    var date = new Date($scope.start_date);
    var start = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
    date = new Date($scope.end_date);
    var end = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + ' ' + date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
    console.log(start, end);
    $http({
      url: '/transactions',
      method: 'post',
      data: {start: start,
            end: end}
    }).then(function(data){
        $scope.details = data.data;
        console.log($scope.details);
    }, function(err){});
  }
}]);
