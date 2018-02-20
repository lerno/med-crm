export default function MembersAddCtrl($scope, $timeout, $state, sweet, Api) {
  $scope.member = {};
  $scope.countries = Api.Countries().query(() => {
    $scope.member.country_id = 204;
  });
  $scope.genders = Api.Genders().query();

  $timeout(() => {
    $scope.personForm.$show();
  });

  $scope.savePerson = function () {
    var member = Api.Members().save($scope.member, () => {
      $state.go('members.detail', member);
    });
  };
}
