function LoginCtrl($scope, $state, authorization) {
  $scope.user;
  
  $scope.login = function(e) {
    authorization.login($scope.user).then(function(){
      console.log('users.lists');
      $state.go('users.list');
    }, function(headers, data) {
      $scope.$broadcast('httpRejection', data);
    });
  }
  
}