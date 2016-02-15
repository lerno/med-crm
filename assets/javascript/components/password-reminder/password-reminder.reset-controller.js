function PwdReminderResetCtrl ($scope, $state, $stateParams, sweet, Api) {
  $scope.pwdReminder = {};
  $scope.pwdReminder.token = $stateParams.token;

  $scope.reset = function () {    
    Api.Passwords().reset($scope.pwdReminder, function () {
      $state.go('login');
    });
  }
}