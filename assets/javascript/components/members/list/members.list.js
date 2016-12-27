angular.module('askCrm.members.list', [
  'askCrm',
  'ui.bootstrap.dropdown',
  'askCrm.exportButton',
  'askCrm.members.paymentReminderButton'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('members.list', {
      url: '/list?sort&personal_number&email&last_name&no_payment_reminder&duplicates&page&too_old_birthdate&outgoing_membership',
      reloadOnSearch: false,
      resolve: {
        members: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Members().query($stateParams).$promise;
        }]
      },
      data: {
        permissions: {
          only: ['admin']
        }
      },
      views: {
        '': {
          templateUrl: '/components/members/list/members.list.html',
          controller: 'MembersListCtrl',
        },
        'paymentReminderButton@members.list': {
          templateUrl: '/components/members/payment-reminder-button/members.payment-reminder-button.html',
          controller: 'MembersPaymentReminderButtonCtrl',
        },
        'exportButton@members.list': {
          templateUrl: '/components/export-button/export-button.html',
          controller: 'ExportButtonCtrl',
        }
      }

    })
}])

.controller('MembersListCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'sweet', 'Api', 'members', MembersListCtrl])