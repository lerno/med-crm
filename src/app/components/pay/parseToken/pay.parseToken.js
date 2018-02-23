import angular from 'angular';
import PayParseTokenTemplate from './pay.parseToken.html'

angular.module('askCrm.pay.parseToken', [
  'askCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('pay.parseToken', {
        url: '/parse-token?token',
        parent: 'pay',
        template: PayParseTokenTemplate,
        controller: 'PayParseTokenCtrl',
      });
  }])

  .controller('PayParseTokenCtrl', ['$scope', '$stateParams', 'Api', PayParseTokenCtrl]);
