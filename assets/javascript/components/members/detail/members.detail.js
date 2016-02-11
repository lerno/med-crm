angular.module('askCrm.members.detail', [
  'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('members.detail', {
      url: '/:id',
      parent: 'members',
      templateUrl: '/components/members/detail/members.detail.html',
      controller: 'MembersDetailCtrl',
      resolve: {
        member: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Members().get($stateParams).$promise;
        }]
      }
    })
}])

.controller('MembersDetailCtrl', ['$scope', 'sweet', 'Api', 'member', MembersDetailCtrl])
