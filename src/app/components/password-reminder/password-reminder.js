import angular from 'angular';
import PwdReminderResetTemplate from './password-reminder.reset.html';
import PwdReminderEmailTemplate from './password-reminder.email.html';

import PwdReminderEmailCtrl from './password-reminder.email-controller';
import PwdReminderResetCtrl from './password-reminder.reset-controller';

angular.module('medCrm.passwordReminder', [
  'medCrm',
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
        template: PwdReminderEmailTemplate,
        controller: 'PwdReminderEmailCtrl',
      })
      .state('passwordReminder.reset', {
        url: '/reset?token',
        template: PwdReminderEmailTemplate,
        controller: 'PwdReminderResetCtrl',
      });
  }])

  .controller('PwdReminderEmailCtrl', ['$scope', '$state', 'SweetAlert', 'Api', PwdReminderEmailCtrl])
  .controller('PwdReminderResetCtrl', ['$scope', '$state', '$stateParams', 'SweetAlert', 'Api', PwdReminderResetCtrl]);
