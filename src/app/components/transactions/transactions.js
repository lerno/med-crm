import angular from 'angular';
import ExportButtonTemplate from './../export-button/export-button.html';
import TransactionsTemplate from './transactions.html';
import '../export-button/export-button';
import TransactionsCtrl from './transactions-controller';

angular.module('medCrm.payments', [
  'medCrm',
  'medCrm.exportButton',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('transactions', {
        url: '/transactions?page',
        resolve: {
          transactions: ['$stateParams', 'Api', function ($stateParams, Api) {
            return Api.Payments().query($stateParams).$promise;
          }],
        },
        views: {
          '': {
            template: TransactionsTemplate,
            controller: 'TransactionsCtrl',
          },
          'exportButton@transactions': {
            template: TransactionsTemplate,
            controller: 'ExportButtonCtrl',
          },
        },
      });
  }])

  .controller('TransactionsCtrl', ['$scope', '$state', '$stateParams', 'Api', 'transactions', TransactionsCtrl]);
