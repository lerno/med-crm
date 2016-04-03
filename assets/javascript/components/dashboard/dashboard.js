angular.module('askCrm.dashboard', [
  'askCrm.dashboard.admin'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      abstract: true,
      template: '<ui-view />'
    });
}]);
