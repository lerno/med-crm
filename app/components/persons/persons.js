angular.module('askCrm.start', ['ngTable'])

.config(function($stateProvider, $urlRouterProvider) {
//  $urlRouterProvider.otherwise('/persons');
  $stateProvider
    .state('persons', {
      url: '/persons',
      templateUrl: '/components/persons/persons.html',
      controller: 'PersonsCtrl',
      resolve: {
        persons: ['Api', function(Api) {
          return Api.Persons().query().$promise;
        }]
      }
    })
})


.controller('PersonsCtrl', ['$scope', '$resource', '$timeout', 'ngTableParams', 'Api', PersonsCtrl])