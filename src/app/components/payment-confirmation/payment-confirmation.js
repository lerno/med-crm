import angular from 'angular';
import PaymentConfirmationTemplate from './payment-confirmation.html'

import PaymentConfirmationCtrl from './payment-confirmation-controller';

// Module for showing payment confirmation after visiting Klarna
angular.module('medCrm.paymentConfirmation', [
  'medCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('payments', {
        url: '/payments?klarna_order&payment_method_id',
        controller: 'PaymentConfirmationCtrl',
        template: PaymentConfirmationTemplate,
        resolve: {
          klarnaId: ['$stateParams', function ($stateParams) {
            let _split = $stateParams.klarna_order.split('/'),
              klarna_id = _split[_split.length - 1];
            return klarna_id;
          }],
          nextUrl: ['$stateParams', 'Api', 'klarnaId', function ($stateParams, Api, klarnaId) {
            return Api.Payments().getNextUrl({ externalId: klarnaId, payment_method_id: $stateParams.payment_method_id }).$promise;
          }],
        },
      });
  }])

  .controller('PaymentConfirmationCtrl', ['$scope', '$state', '$stateParams', '$sce', 'Api', 'klarnaId', 'nextUrl', PaymentConfirmationCtrl]);
