angular.module('askCrm.members.import', [
  'askCrm'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('members.import', {
      url: '/import',
      templateUrl: '/components/members/import/members.import.html',
      controller: 'MembersImportCtrl'
    })
})


.controller('MembersImportCtrl', ['$scope', '$timeout', '$state', 'Upload', 'Api', MembersImportCtrl])