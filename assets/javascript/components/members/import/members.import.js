import angular from 'angular';
import MembersImportCtrl from './members.import-controller';

angular.module('askCrm.members.import', [
  'askCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.import', {
        url: '/import',
        templateUrl: '/components/members/import/members.import.html',
        controller: 'MembersImportCtrl',
        data: {
          permissions: {
            only: ['admin'],
          },
        },
      });
  }])

  .controller('MembersImportCtrl', ['$scope', '$timeout', '$state', '$log', 'Upload', 'SweetAlert', 'APIURI', MembersImportCtrl]);
