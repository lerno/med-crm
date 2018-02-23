import angular from 'angular';
import DashboardAdminTemplate from './dashboard.admin.html'
import DashboardAdminCtrl from './dashboard.admin-controller';

angular.module('medCrm.dashboard.admin', [
  'medCrm',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.admin', {
        url: '/admin',
        controller: 'DashboardAdminCtrl',
        template: DashboardAdminTemplate,
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
