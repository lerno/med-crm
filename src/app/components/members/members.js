import angular from 'angular';

import './list/members.list';
import './add/members.add';
import './import/members.import';
import './detail/members.detail';
import './payment/members.payment';

angular.module('medCrm.members', [
  'medCrm.members.list',
  'medCrm.members.add',
  'medCrm.members.import',
  'medCrm.members.detail',
  'medCrm.members.payment',
  'medCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members', {
        url: '/members',
        abstract: true,
        template: '<ui-view />',
      });
  }]);
