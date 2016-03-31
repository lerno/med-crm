angular.module('askCrm.members.detail', [
  'askCrm.members.detail.person',
  'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('members.detail', {
      url: '/:id',
      parent: 'members',
      resolve: {
        member: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Members().get($stateParams).$promise;
        }]
      },
      views: {
        '': {
          templateUrl: '/components/members/detail/members.detail.html',
          controller: 'MembersDetailCtrl'
        },
        'personDetail@members.detail': {
          templateUrl: '/components/members/detail/person/members.detail.person.html',
          controller: 'MembersDetailPersonCtrl'
        }
      }
    })
}])

.controller('MembersDetailCtrl', ['$scope', '$filter', 'sweet', 'Api', 'member', MembersDetailCtrl])
