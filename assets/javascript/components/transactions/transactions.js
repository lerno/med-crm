import angular from 'angular';
import '../export-button/export-button';
import TransactionsCtrl from './transactions-controller';

angular.module('askCrm.payments', [
  'askCrm',
  'askCrm.exportButton',
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
            templateUrl: '/components/transactions/transactions.html',
            controller: 'TransactionsCtrl',
          },
          'exportButton@transactions': {
            templateUrl: '/components/export-button/export-button.html',
            controller: 'ExportButtonCtrl',
          },
        },
      });
  }])

  .controller('TransactionsCtrl', ['$scope', '$state', '$stateParams', 'Api', 'transactions', TransactionsCtrl]);
