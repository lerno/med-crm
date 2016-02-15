angular.module('askCrm.login', [
  'askCrm', 
  'askCrm.passwordReminder',
  'askCrm.members',
  'ngCookies'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/components/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('loginWithToken', {
      url: '/login-with-token/:token',
      controller: 'LoginWithTokenCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: ['$state', 'authorization', function($state, authorization) {
        authorization.logout();
        $state.go('login');
      }]
    })
}])

.controller('LoginCtrl', ['$scope', '$state', '$stateParams', 'sweet', 'authorization', LoginCtrl])

.controller('LoginWithTokenCtrl', ['$scope', '$http', '$state', '$stateParams', 'Api', 'authorization', LoginWithTokenCtrl])