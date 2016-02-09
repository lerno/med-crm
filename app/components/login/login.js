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
      controller: ['authorization', function(authorization) {
        authorization.logout();
      }]
    })
})

.controller('LoginCtrl', ['$scope', '$state', 'authorization', LoginCtrl])

.controller('LoginWithTokenCtrl', ['$scope', '$http', '$stateParams', 'authorization', LoginWithTokenCtrl])