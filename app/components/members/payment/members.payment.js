angular.module('askCrm.members.payment', [
  'askCrm'
  ])

.config(function($stateProvider, $urlRouterProvider) {

//  $urlRouterProvider.otherwise("/add-person");
  $stateProvider
    .state('members.addPayment', {
      url: '/:id/pay',
      abstract: true,
      parent: 'members',
      templateUrl: '/components/members/payment/members.payment.html',
      controller: 'MembersAddPaymentCtrl',
      resolve: {
        member: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Members().get($stateParams).$promise;
        }]
      }
    })
    .state('members.addPayment.step1', {
      url: '',
      parent: 'members.addPayment',
      templateUrl: '/components/members/payment/step1/members.payment.step1.html',
      controller: 'MembersAddPaymentStepOneCtrl'
    })
    .state('members.addPayment.step3', {
      url: '/confirm',
      parent: 'members.addPayment',
      templateUrl: '/components/members/payment/step3/members.payment.step3.html',
      controller: 'MembersAddPaymentStepThreeCtrl'
    })
    .state('members.addPayment.step2', {
      url: '/:payment_method_id',
      parent: 'members.addPayment',
      templateUrl: '/components/members/payment/step2/members.payment.step2.html',
      controller: 'MembersAddPaymentStepTwoCtrl'
    })
    .state('payments', {
      url: '/payments?klarna_order',
      controller: 'PaymentsCtrl'
    })
})

.controller('MembersAddPaymentCtrl', ['$scope', 'Api', 'member', MembersAddPaymentCtrl])
.controller('MembersAddPaymentStepOneCtrl', ['$scope', 'Api', 'member', MembersAddPaymentStepOneCtrl])
.controller('MembersAddPaymentStepTwoCtrl', ['$scope', '$sce', '$stateParams', 'Api', 'member', MembersAddPaymentStepTwoCtrl])
.controller('MembersAddPaymentStepThreeCtrl', ['$scope', '$stateParams', 'Api', 'member', MembersAddPaymentStepThreeCtrl])
.controller('PaymentsCtrl', ['$scope', '$state', '$stateParams', 'Api', PaymentsCtrl])

.directive('evaluateScript', function($compile, $parse){
  return {
    link: function(scope, element, attr){
      var parsed = $parse(attr.ngBindHtml);
      function getStringValue() { return (parsed(scope) || '').toString(); }

      //Recompile if the template changes
      scope.$watch(getStringValue, function(value) {
        var code = element.find('script');
        if (code) {
          var f = new Function(code.html());
          f();
        }
      });
    }         
  }
});