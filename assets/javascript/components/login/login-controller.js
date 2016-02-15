function LoginCtrl($scope, $state, $stateParams, sweet, authorization) {
  $scope.user;

  $scope.login = function(e) {
    authorization.login($scope.user).then(function(){
      $state.go('members.list');
    });
  }
  
}