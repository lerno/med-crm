function LoginCtrl($scope, $state, authorization) {
  $scope.user;
  
  $scope.login = function(e) {
    authorization.login($scope.user).then(function(){
      console.log('members.lists');
      $state.go('members.list');
    }, function(headers, data) {
      $scope.$broadcast('httpRejection', data);
    });
  }
  
}