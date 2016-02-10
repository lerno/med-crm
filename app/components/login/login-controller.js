function LoginCtrl($scope, $state, sweet, authorization) {
  $scope.user;
  
  $scope.login = function(e) {
    authorization.login($scope.user).then(function(){
      $state.go('members.list');
    });
  }
  
}