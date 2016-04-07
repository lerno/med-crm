// Module for showing payment confirmation after visiting Klarna
angular.module('askCrm.paymentConfirmation', [
  'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('payments', {
      url: '/payments?klarna_order',
      controller: 'PaymentConfirmationCtrl',
      templateUrl: '/components/payment-confirmation/payment-confirmation.html'
    })
}])

.controller('PaymentConfirmationCtrl', ['$scope', '$state', '$stateParams', '$sce', 'Api', PaymentConfirmationCtrl])
