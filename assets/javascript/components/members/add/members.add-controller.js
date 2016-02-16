function MembersAddCtrl ($scope, $timeout, $state, sweet, Api) {
  $scope.member = {};
  $scope.countries = Api.Countries().query(function () {
    $scope.member.country_id = 204;
  });
  $scope.genders = Api.Genders().query();

  $timeout(function () {
    $scope.personForm.$show();
  })

  $scope.savePerson = function () {
    var member = Api.Members().save($scope.member, function () {
      $state.go('members.detail', member);
    })
  }

}