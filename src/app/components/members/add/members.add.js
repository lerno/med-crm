import angular from 'angular';
import MembersAddTemplate from './members.add.html'
import MembersAddCtrl from './members.add-controller';

angular.module('medCrm.members.add', [
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.add', {
        url: '/add',
        template: MembersAddTemplate,
        controller: 'MembersAddCtrl',
        data: {
          permissions: {
            only: ['admin'],
          },
        },
      });
  }])

  .controller('MembersAddCtrl', ['$scope', '$timeout', '$state', 'SweetAlert', 'Api', MembersAddCtrl]);
