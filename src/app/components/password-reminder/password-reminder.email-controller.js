export default function PwdReminderEmailCtrl($scope, $state, sweet, Api) {
  $scope.user;
  const resetLink = $state.href('passwordReminder.reset', { token: '{token}' }, { absolute: true });

  $scope.remind = function () {
    const data = angular.copy($scope.user);
    data.reset_link = unescape(resetLink);
    Api.Passwords().email(data, () => {
      sweet.show('Skickat!', 'Ett mail har skickats till dig med en länk för att återställa ditt lösenord!', 'success');
    });
  };
}
