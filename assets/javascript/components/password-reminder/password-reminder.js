import angular from 'angular';

import PwdReminderEmailCtrl from './password-reminder.email-controller';
import PwdReminderResetCtrl from './password-reminder.reset-controller';

angular.module('askCrm.passwordReminder', [
  'askCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('passwordReminder', {
        url: '/password-reminder',
        abstract: true,
        template: '<ui-view />',
      })
      .state('passwordReminder.email', {
        url: '/email',
        templateUrl: '/components/password-reminder/password-reminder.email.html',
        controller: 'PwdReminderEmailCtrl',
      })
      .state('passwordReminder.reset', {
        url: '/reset?token',
        templateUrl: '/components/password-reminder/password-reminder.reset.html',
        controller: 'PwdReminderResetCtrl',
      });
  }])

  .controller('PwdReminderEmailCtrl', ['$scope', '$state', 'SweetAlert', 'Api', PwdReminderEmailCtrl])
  .controller('PwdReminderResetCtrl', ['$scope', '$state', '$stateParams', 'SweetAlert', 'Api', PwdReminderResetCtrl]);
