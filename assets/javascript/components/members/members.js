import angular from 'angular';

import './list/members.list';
import './add/members.add';
import './import/members.import';
import './detail/members.detail';
import './payment/members.payment';

angular.module('askCrm.members', [
  'askCrm.members.list',
  'askCrm.members.add',
  'askCrm.members.import',
  'askCrm.members.detail',
  'askCrm.members.payment',
  'askCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members', {
        url: '/members',
        abstract: true,
        template: '<ui-view />',
      });
  }]);
