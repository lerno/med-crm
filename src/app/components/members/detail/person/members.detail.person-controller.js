export default function MembersDetailPersonCtrl($scope, $filter, $timeout, $state, sweet, Api, member) {
  $scope.countries = Api.Countries().query();
  $scope.genders = Api.Genders().query();

  $scope.member = member;
  $scope.member.birthdate = new Date($scope.member.birthdate);

  $scope.savePerson = function () {
    $scope.member.$update((response) => {
      response.birthdate = new Date(response.birthdate);
      return response;
    });
  };

  $scope.$watch('member.mobile', (v) => {
    if (v.substr(0, 1) == '0') {
    }
  });

  $scope.$on('$stateChangeStart', (event, toState, toParams) => {
    if (toParams.force === 'true') {
      return;
    }

    if (!$scope.personForm.$visible) {
      return;
    }

    event.preventDefault();

    sweet.show({
      title: 'Du har inte sparat dina ändringar',
      text: 'Är du säker på att du vill gå vidare?',
      cancelButtonText: 'Avbryt',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ja, gå vidare!',
    }, (isConfirm) => {
      if (isConfirm) {
        console.log('go');
        toParams.force = true;
        $state.go(toState.name, toParams);
      }
    });
    //    console.log('change', $scope.personForm);
  });
}
