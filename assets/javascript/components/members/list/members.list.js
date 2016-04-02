angular.module('askCrm.members.list', [
  'askCrm',
  'ui.bootstrap.dropdown',
  'askCrm.members.paymentReminderButton'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('members.list', {
      url: '/list?sort&personal_number&email&last_name&no_payment_reminder&duplicates&page',
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
        }
      }

    })
}])

.controller('MembersListCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'sweet', 'Api', 'members', MembersListCtrl])