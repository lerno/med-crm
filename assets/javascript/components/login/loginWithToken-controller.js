export default function LoginWithTokenCtrl($scope, $http, $state, $stateParams, Api, authorization) {
  authorization.loginWithToken($stateParams.token).then((user) => {
    $state.go('members.addPayment.step1', { id: user.member_id });
  });
}
