import angular from 'angular';
import DashboardAdminCtrl from './dashboard.admin-controller';

angular.module('askCrm.dashboard.admin', [
  'askCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.admin', {
        url: '/admin',
        controller: 'DashboardAdminCtrl',
        templateUrl: '/components/dashboard/admin/dashboard.admin.html',
        resolve: {
          members: ['Api', function (Api) {
            return Api.Members().query().$promise;
          }],
          payments: ['Api', function (Api) {
            return Api.Payments().query().$promise;
          }],
        },
        data: {
          permissions: {
            only: ['admin'],
          },
        },
      });
  }])

  .controller('DashboardAdminCtrl', ['$scope', 'Api', 'principal', 'members', 'payments', DashboardAdminCtrl]);
