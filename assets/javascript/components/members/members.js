angular.module('askCrm.members', [
  'askCrm.members.list',
  'askCrm.members.edit',
  'askCrm.members.import',
  'askCrm.members.detail',
  'askCrm.members.payment',
  'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('members', {
      url: '/members',
      abstract: true,
      template: '<ui-view />'
    })
}])