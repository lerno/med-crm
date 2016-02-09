angular.module('askCrm.members.edit', [
  'askCrm'
  ])

.config(function($stateProvider, $urlRouterProvider) {

//  $urlRouterProvider.otherwise("/add-person");
  $stateProvider
    .state('members.add', {
      url: '/add',
      parent: 'members',
      templateUrl: '/components/members/edit/members.edit.html',
      controller: 'MembersEditCtrl',
      resolve: {
        member: ['Api', function(Api) {
          var member = new Api.Members();
          console.log('member', member);
          return null;
        }]
      }
    })
    .state('members.edit', {
      url: '/:id/edit',
      templateUrl: '/components/members/edit/members.edit.html',
      controller: 'MembersEditCtrl',
      resolve: {
        member: ['$stateParams', 'Api', function($stateParams, Api) {
          return Api.Members().get({id: $stateParams.id}).$promise;
        }]
      }
    })
})

.controller('MembersEditCtrl', ['$scope', 'Api', 'member', MembersEditCtrl])

.directive('stripMediaUrl', function() {
  return { 
    restrict: 'A',
    require: 'ngModel',
    replace: true,
    link: function(scope, element, attrs, ngModel) {
      console.log();
      element.bind('blur', function(e) {
        if( typeof ngModel.$modelValue == 'undefined' ) {
          return;
        }

        value =  ngModel.$modelValue.toString();
        switch( attrs.stripMediaUrl ) {
          case 'facebook':
            searchFor = 'facebook.com\/';
          break;
          case 'twitter':
            searchFor = 'twitter.com\/';
          break;
          case 'aikforum':
            searchFor = 'http://www.aikforum.se\/medlemmar\/';
          break;
          case 'google':
            searchFor = 'plus.google.com\/';
          break;
        }

        ngModel.$setViewValue(value.substring(value.indexOf(searchFor) + searchFor.length));
        ngModel.$render();
      });

    }
  };
});