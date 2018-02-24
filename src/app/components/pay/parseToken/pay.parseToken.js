import angular from 'angular';
import PayParseTokenTemplate from './pay.parseToken.html';

angular.module('medCrm.pay.parseToken', [
  'medCrm',
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
