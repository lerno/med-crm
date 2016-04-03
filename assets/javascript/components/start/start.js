angular.module('askCrm.start', [
  'askCrm.login',
  'askCrm.members.list'
  ])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('start', {
      url: '/',
      resolve: {
        isAuthenticated: ['principal', function(principal) {
          return principal.identity().then(function (data){
            return principal.isAuthenticated();
          }, function() {
            return principal.isAuthenticated();
          });
        }]
      },
      template: '<div></div>',
      controller: ['$templateCache', '$state', 'isAuthenticated', function ($templateCache, $state, isAuthenticated) {
        if (isAuthenticated === true) {
          $state.go('dashboard.admin');
        } else {
          $state.go('login');
        }
      }]
    });
  }]);
