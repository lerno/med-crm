angular.module('askCrm.members.list', [
  'askCrm'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('members.list', {
      url: '/list?sort&personal_number&email&last_name',
      templateUrl: '/components/members/list/members.list.html',
      controller: 'MembersListCtrl',
      reloadOnSearch: true,
      resolve: {
        members: ['$stateParams', 'Api', function($stateParams, Api) {
          console.log('$stateParams', $stateParams);
          return Api.Members().query($stateParams);
        }]
      }
    })
})


.controller('MembersListCtrl', ['$scope', '$state', '$stateParams', '$location', '$timeout', 'Api', 'members', MembersListCtrl])