angular.module('askCrm.pay.parseToken', [
  'askCrm'
  ])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('pay.parseToken', {
      url: '/parse-token?token',
      parent: 'pay',
      templateUrl: '/components/pay/parseToken/pay.parseToken.html',
      controller: 'PayParseTokenCtrl'
    })
})

.controller('PayParseTokenCtrl', ['$scope', '$stateParams', 'Api', PayParseTokenCtrl])