import angular from 'angular';
import MembersImportTemplate from './members.import.html';
import MembersImportCtrl from './members.import-controller';

angular.module('medCrm.members.import', [
  'medCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members.import', {
        url: '/import',
        template: MembersImportTemplate,
        controller: 'MembersImportCtrl',
        data: {
          permissions: {
            only: ['admin'],
          },
        },
      });
  }])

  .controller('MembersImportCtrl', ['$scope', '$timeout', '$state', '$log', 'Upload', 'SweetAlert', 'APIURI', MembersImportCtrl]);
