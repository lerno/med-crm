import angular from 'angular';
import MembersPaymentReminderButtonTemplate from './../payment-reminder-button/members.payment-reminder-button.html'
import MembersDetailPersonTemplate from './person/members.detail.person.html'
import MembersDetailTemplate from './members.detail.html'
import './person/members.detail.person';
import MembersDetailCtrl from './members.detail-controller';

angular.module('medCrm.members.detail', [
  'medCrm.members.detail.person',
  'medCrm',
  'medCrm.members.paymentReminderButton',
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
            template: MembersDetailTemplate,
            controller: 'MembersDetailCtrl',
          },
          'personDetail@members.detail': {
            template: MembersDetailTemplate,
            controller: 'MembersDetailPersonCtrl',
          },
          'paymentReminderButton@members.detail': {
            template: MembersDetailTemplate,
            controller: 'MembersPaymentReminderButtonCtrl',
          },
        },
      });
  }])

  .controller('MembersDetailCtrl', ['$scope', '$filter', 'SweetAlert', 'Api', 'member', MembersDetailCtrl]);
