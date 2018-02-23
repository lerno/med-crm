import angular from 'angular';

import '../password-reminder/password-reminder';
import '../members/members';

import LoginCtrl from './login-controller.js';
import LoginWithTokenCtrl from './loginWithToken-controller.js';
import LoginTemplate from './login.html';

angular.module('medCrm.login', [
  'medCrm',
  'medCrm.passwordReminder',
  'medCrm.members',
  'ngCookies',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: LoginTemplate,
        controller: 'LoginCtrl',
      })
      .state('loginWithToken', {
        url: '/login-with-token/:token',
        controller: 'LoginWithTokenCtrl',
      })
      .state('logout', {
        url: '/logout',
        controller: ['$state', 'authorization', function ($state, authorization) {
          authorization.logout();
          $state.go('login');
        }],
      });
  }])

  .controller('LoginCtrl', ['$scope', '$state', '$stateParams', 'SweetAlert', 'authorization', LoginCtrl])

  .controller('LoginWithTokenCtrl', ['$scope', '$http', '$state', '$stateParams', 'Api', 'authorization', LoginWithTokenCtrl]);
