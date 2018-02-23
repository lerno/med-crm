import angular from 'angular';
import './admin/dashboard.admin';

angular.module('medCrm.dashboard', [
  'medCrm.dashboard.admin',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        abstract: true,
        template: '<ui-view />',
      });
  }]);
