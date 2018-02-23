import angular from 'angular';
import MembersAddPaymentStepTwoTemplate from './step2/members.payment.step2.html'
import MembersDetailPersonTemplate from './../detail/person/members.detail.person.html'
import MembersAddPaymentStepOneTemplate from './step1/members.payment.step1.html'
import MembersAddPaymentTemplate from './members.payment.html'
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
        template: MembersAddPaymentTemplate,
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
            template: MembersAddPaymentTemplate,
            controller: 'MembersAddPaymentStepOneCtrl',
          },
          'personDetail@members.addPayment.step1': {
            template: MembersAddPaymentTemplate,
            controller: 'MembersDetailPersonCtrl',
          },
        },
      })
      .state('members.addPayment.step2', {
        url: '/:payment_method_id?force',
        template: MembersAddPaymentTemplate,
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
