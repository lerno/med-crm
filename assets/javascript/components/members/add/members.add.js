angular.module('askCrm.members.add', [
  'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('members.add', {
      url: '/add',
      parent: 'members',
      templateUrl: '/components/members/add/members.add.html',
      controller: 'MembersAddCtrl',
      data: {
        permissions: {
          only: ['admin']
        }
      }
    })
}])

.controller('MembersAddCtrl', ['$scope', '$timeout', '$state', 'sweet', 'Api', MembersAddCtrl])
