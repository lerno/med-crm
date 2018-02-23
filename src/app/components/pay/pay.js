import angular from 'angular';

angular.module('medCrm.pay', [
  'medCrm.pay.parseToken',
  'medCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('pay', {
        url: '/pay',
        abstract: true,
        template: '<ui-view />',
      });
  }]);
