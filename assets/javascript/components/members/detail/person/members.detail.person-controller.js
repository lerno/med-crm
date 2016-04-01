function MembersDetailPersonCtrl ($scope, $filter, $timeout, sweet, Api, member) {
  $scope.countries = Api.Countries().query();
  $scope.genders = Api.Genders().query();

  $scope.member = member;
  $scope.member.birthdate = new Date($scope.member.birthdate);

  $scope.savePerson = function () {
    $scope.member.$update(function (response) {
      response.birthdate = new Date(response.birthdate);
      return response;
    });
  }

  $scope.$watch('member.mobile', function (v) {
    if (v.substr(0, 1) == '0') {
    }
  });
}