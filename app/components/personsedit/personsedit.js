angular.module('askCrm.addperson', [])

.config(function($stateProvider, $urlRouterProvider) {
//  $urlRouterProvider.otherwise("/add-person");
console.log("hejsan");
console.log($urlRouterProvider);
  $stateProvider
    .state('personsadd', {
      url: '/persons/add',
      templateUrl: '/components/personsedit/personsedit.html',
      controller: 'PersonsaddCtrl'
    })
    .state('personsedit', {
      url: '/persons/:id/edit',
      templateUrl: '/components/personsedit/personsedit.html',
      controller: 'PersonseditCtrl',
      resolve: {
        person: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Persons().get({id: $stateParams.id}).$promise;
        }]
      }
    })
})

.controller('PersonsaddCtrl', ['$scope', 'Api', PersonsaddCtrl])

.controller('PersonseditCtrl', ['$scope', 'Api', 'person', PersonseditCtrl])

