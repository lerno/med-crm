import angular from 'angular';
import MembersAddPaymentCtrl from './members.payment-controller';
import MembersAddPaymentStepOneCtrl from './step1/members.payment.step1-controller';
import MembersAddPaymentStepTwoCtrl from './step2/members.payment.step2-controller';

angular.module('askCrm.members.payment', [
  'askCrm.members.detail.person',
  'askCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.addPayment', {
        url: '/:id/pay',
        abstract: true,
        templateUrl: '/components/members/payment/members.payment.html',
        controller: 'MembersAddPaymentCtrl',
        resolve: {
          price: ['$stateParams', 'Api', function ($stateParams, Api) {
            console.log($stateParams);
            return Api.Members().getMembershipPrice($stateParams).$promise;
          }],
          member: ['$stateParams', 'Api', function ($stateParams, Api) {
            return Api.Members().get($stateParams).$promise;
          }],
        },
      })
      .state('members.addPayment.step1', {
        url: '',
        views: {
          '': {
            templateUrl: '/components/members/payment/step1/members.payment.step1.html',
            controller: 'MembersAddPaymentStepOneCtrl',
          },
          'personDetail@members.addPayment.step1': {
            templateUrl: '/components/members/detail/person/members.detail.person.html',
            controller: 'MembersDetailPersonCtrl',
          },
        },
      })
      .state('members.addPayment.step2', {
        url: '/:payment_method_id?force',
        templateUrl: '/components/members/payment/step2/members.payment.step2.html',
        controller: 'MembersAddPaymentStepTwoCtrl',
        resolve: {
          paymentInfo: ['$stateParams', 'Api', function ($stateParams, Api) {
            return Api.Members().getPaymentInfo($stateParams).$promise;
          }],
        },
      });
  }])

  .controller('MembersAddPaymentCtrl', ['$scope', 'Api', 'member', 'price', MembersAddPaymentCtrl])
  .controller('MembersAddPaymentStepOneCtrl', ['$scope', 'Api', 'member', MembersAddPaymentStepOneCtrl])
  .controller('MembersAddPaymentStepTwoCtrl', ['$scope', '$sce', '$stateParams', '$http', 'member', 'paymentInfo', MembersAddPaymentStepTwoCtrl])

  .directive('evaluateScript', ['$compile', '$parse', function ($compile, $parse) {
    return {
      link(scope, element, attr) {
        const parsed = $parse(attr.ngBindHtml);
        function getStringValue() { return (parsed(scope) || '').toString(); }

        // Recompile if the template changes
        scope.$watch(getStringValue, (value) => {
          const code = element.find('script');
          if (code) {
            const f = new Function(code.html());
            f();
          }
        });
      },
    };
  }]);
