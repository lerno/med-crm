function LoginWithTokenCtrl ($scope, $http, $state, $stateParams, Api, authorization) {

  $http.defaults.headers.common['Authorization'] = 'Bearer: ' + $stateParams.token;

  var user = Api.Users().get({id: 'me'}, function () {
    authorization.setTokenAndUser($stateParams.token, user);

    $state.go('members.detail', {id: user.member_id});
  });

}