import angular from 'angular';
import MembersAddCtrl from './members.add-controller';

angular.module('askCrm.members.add', [
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.add', {
        url: '/add',
        templateUrl: '/components/members/add/members.add.html',
        controller: 'MembersAddCtrl',
        data: {
          permissions: {
            only: ['admin'],
          },
        },
      });
  }])

  .controller('MembersAddCtrl', ['$scope', '$timeout', '$state', 'SweetAlert', 'Api', MembersAddCtrl]);
