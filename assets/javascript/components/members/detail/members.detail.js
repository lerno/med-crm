import angular from 'angular';
import './person/members.detail.person';
import MembersDetailCtrl from './members.detail-controller';

angular.module('askCrm.members.detail', [
  'askCrm.members.detail.person',
  'askCrm',
  'askCrm.members.paymentReminderButton',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.detail', {
        url: '/:id',
        resolve: {
          member: ['$stateParams', 'Api', function ($stateParams, Api) {
            return Api.Members().get($stateParams).$promise;
          }],
        },
        views: {
          '': {
            templateUrl: '/components/members/detail/members.detail.html',
            controller: 'MembersDetailCtrl',
          },
          'personDetail@members.detail': {
            templateUrl: '/components/members/detail/person/members.detail.person.html',
            controller: 'MembersDetailPersonCtrl',
          },
          'paymentReminderButton@members.detail': {
            templateUrl: '/components/members/payment-reminder-button/members.payment-reminder-button.html',
            controller: 'MembersPaymentReminderButtonCtrl',
          },
        },
      });
  }])

  .controller('MembersDetailCtrl', ['$scope', '$filter', 'SweetAlert', 'Api', 'member', MembersDetailCtrl]);
