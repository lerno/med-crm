import angular from 'angular';

angular.module('medCrm.start', [
  'medCrm.login',
  'medCrm.members.list',
])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('start', {
        url: '/',
        resolve: {
          isAuthenticated: ['principal', function (principal) {
            return principal.identity().then(data => principal.isAuthenticated(), () => principal.isAuthenticated());
          }],
        },
        template: '<div></div>',
        controller: ['$templateCache', '$state', 'isAuthenticated', function ($templateCache, $state, isAuthenticated) {
          if (isAuthenticated === true) {
            $state.go('dashboard.admin');
          } else {
            $state.go('login');
          }
        }],
      });
  }]);
