angular.module('askCrm.members.list', [
  'askCrm'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('members.list', {
      url: '/list?sort&personal_number&email&last_name&no_payment_reminder&duplicates&page',
      templateUrl: '/components/members/list/members.list.html',
      controller: 'MembersListCtrl',
      reloadOnSearch: false,
      resolve: {
        members: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Members().query($stateParams).$promise;
        }]
      },
      data: {
        permissions: {
          only: ['admin']
        }
      }

    })
}])

.controller('MembersListCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'sweet', 'Api', 'members', MembersListCtrl])