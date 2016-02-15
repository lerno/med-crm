function PwdReminderEmailCtrl ($scope, $state, sweet, Api) {
  $scope.user;
  var resetLink = $state.href('passwordReminder.reset', {token: "{token}"}, {absolute: true});

  $scope.remind = function () {
    var data = angular.copy($scope.user);
    data.reset_link = unescape(resetLink);
    Api.Passwords().email(data, function () {
      sweet.show('Skickat!', 'Ett mail har skickats till dig med en länk för att återställa ditt lösenord!', 'success');
    });
  }
}