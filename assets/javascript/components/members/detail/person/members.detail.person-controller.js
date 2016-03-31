function MembersDetailPersonCtrl ($scope, $filter, $timeout, sweet, Api, member) {
  console.log("HEJ");

  $scope.countries = Api.Countries().query();
  $scope.genders = Api.Genders().query();

  $scope.savePerson = function () {
    $scope.member.$update();
  }

  $scope.user = {
    dob: new Date(1984, 4, 15)
  };

  $scope.opened = {};

  $scope.open = function($event, elementOpened) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened[elementOpened] = !$scope.opened[elementOpened];
  };
}