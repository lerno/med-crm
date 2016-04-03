angular.module('askCrm.payments', [
  'askCrm'
  ]
)

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('transactions', {
      url: '/transactions',
      templateUrl: '/components/transactions/transactions.html',
      controller: 'TransactionsCtrl',
      resolve: {
        transactions: ['Api', function (Api) {
          return Api.Payments().query().$promise;
        }]
      }
    });
}])

.controller('TransactionsCtrl', ['$scope', '$stateParams', 'transactions', TransactionsCtrl])
