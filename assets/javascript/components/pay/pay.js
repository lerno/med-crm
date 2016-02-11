angular.module('askCrm.pay', [
    'askCrm.pay.parseToken',
    'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('pay', {
      url: '/pay',
      abstract: true,
      template: '<ui-view />'
    })
}])