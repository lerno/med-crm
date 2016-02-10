angular.module('askCrm.login', ['askCrm', 'ngCookies'])

.config(function($stateProvider, $urlRouterProvider) {
//  $urlRouterProvider.otherwise('/persons');
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/components/login/login.html',
      controller: LoginCtrl
    })
    .state('loginWithToken', {
      url: '/login-with-token/:token',
      controller: LoginWithTokenCtrl
    })
    .state('logout', {
      url: '/logout',
      controller: ['$state', 'authorization', function($state, authorization) {
        authorization.logout();
        $state.go('login');
      }]
    })
})

.controller('LoginCtrl', ['$scope', '$state', 'sweet', 'authorization', LoginCtrl])

.controller('LoginWithTokenCtrl', ['$scope', '$http', '$stateParams', 'authorization', LoginWithTokenCtrl])