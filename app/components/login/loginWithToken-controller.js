function LoginWithTokenCtrl ($scope, $http, $state, $stateParams, Api, authorization) {

  console.log('$stateParams', $stateParams);
  $http.defaults.headers.common['Authorization'] = 'Bearer: ' + $stateParams.token;
console.log($http.defaults.headers.common['Authorization']);
  var user = Api.Users().get({id: 'me'}, function () {
    authorization.setTokenAndUser($stateParams.token, user);

    $state.go('members.addPayment.step1', {id: user.member_id});
  });

}