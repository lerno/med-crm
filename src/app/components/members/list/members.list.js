import angular from 'angular';
import ExportButtonTemplate from './../../export-button/export-button.html'
import MembersPaymentReminderButtonTemplate from './../payment-reminder-button/members.payment-reminder-button.html'
import MembersListTemplate from './members.list.html'

import '../../export-button/export-button';
import '../payment-reminder-button/members.payment-reminder-button';
import MembersListCtrl from './members.list-controller';
import ExportButtonCtrl from '../../export-button/export-button-controller';

angular.module('medCrm.members.list', [
  'medCrm',
  'ui.bootstrap.dropdown',
  'medCrm.exportButton',
  'medCrm.members.paymentReminderButton',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.list', {
        url: '/list?sort&personal_number&email&last_name&no_payment_reminder&duplicates&page&too_old_birthdate&outgoing_membership',
        reloadOnSearch: false,
        resolve: {
          members: ['$stateParams', 'Api', function ($stateParams, Api) {
            return Api.Members().query($stateParams).$promise;
          }],
        },
        data: {
          permissions: {
            only: ['admin'],
          },
        },
        views: {
          '': {
            template: MembersListTemplate,
            controller: 'MembersListCtrl',
          },
          'paymentReminderButton@members.list': {
            template: MembersListTemplate,
            controller: 'MembersPaymentReminderButtonCtrl',
          },
          'exportButton@members.list': {
            template: MembersListTemplate,
            controller: 'ExportButtonCtrl',
          },
        },

      });
  }])

  .controller('MembersListCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'SweetAlert', 'Api', 'members', MembersListCtrl]);
