angular.module('askCrm.payments', [
  'askCrm'
  ]
)

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('transactions', {
      url: '/transactions?page',
      templateUrl: '/components/transactions/transactions.html',
      controller: 'TransactionsCtrl',
      resolve: {
        transactions: ['$stateParams', 'Api', function ($stateParams, Api) {
          return Api.Payments().query($stateParams).$promise;
        }]
      }
    });
}])

.controller('TransactionsCtrl', ['$scope', '$state', '$stateParams', 'transactions', TransactionsCtrl])
