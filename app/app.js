'use strict';

var askCrm = angular.module('askCrm', [
  'permission',
  'ui.router',
  'askCrm.pay',
  'askCrm.members',
  'askCrm.api',
  'askCrm.login',
  'kPrincipal',
  'xeditable',
  'checklist-model',
  'ngCookies',
  'ngFileUpload'
])

// The templates module is only used in /dist
var lazyModules = ['templates'];
angular.forEach(lazyModules, function(dependency) {
  var m;
  try {
    m = angular.module(dependency);
  } catch (e) {}

  if (m) {
    askCrm.requires.push(dependency);
  }
});

askCrm.constant('APIURI', appConfig.apiUri)

.config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/login');

  $locationProvider.html5Mode(appConfig.html5Mode);
}])

.run(['$rootScope', '$q', 'PermissionStore', 'principal', function ($rootScope, $q, PermissionStore, principal) {
  principal.identity().then(function(data) {
    $rootScope.currentUser = data;
  });
  // Define anonymous permission
  PermissionStore
    .definePermission('anonymous', function (stateParams) {
      var deferred = $q.defer();
      principal.identity().then(function() {
        // If the returned value is *truthy* then the user has the permission, otherwise they don't
        if (!principal.isAuthenticated) {
          return deferred.resolve(); // Is anonymous
        }
        return deferred.reject();
      })
      return deferred.promise;
    });
  PermissionStore
    .definePermission('admin', function (stateParams) {
      var deferred = $q.defer();
      principal.identity().then(function() {
        if (principal.isInRole('admin')) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      });
      return deferred.promise;
    });
}])

.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}])

.factory('authorization', ['$rootScope', '$state', '$q', '$http', '$cookies', 'principal', 'APIURI',
  function($rootScope, $state, $q, $http, $cookies, principal, APIURI) {
    return {
      authorize: function() {
        return principal.identity()
          .then(function(data) {
            var isAuthenticated = principal.isAuthenticated();
            // Check if the state needs a role auth and if the user don't have it
            if ($rootScope.toState && $rootScope.toState.data && $rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
              if (isAuthenticated) $state.go('login'); // user is signed in but not authorized for desired state
              else {
                // user is not authenticated. stow the state they wanted before you
                // send them to the signin state, so you can return them when you're done
                $rootScope.returnToState = $rootScope.toState;
                $rootScope.returnToStateParams = $rootScope.toStateParams;

                // now, send them to the signin state so they can log in
                $state.go('login');
              }
            }
          }, function(reason){
              // If we couldn't get the user data
              $state.go('login');
          });
      },
      setTokenAndUser: function(token, user) {
        $cookies.token = token;
        $cookies.user_id = user.id;
        return;
      },
      login: function(_user) {
          var deferred = $q.defer();

          $http
            .post(APIURI + '/authentication', _user)
            .success(function (data, status, headers, config) {
                $cookies.token = data.token;
                $cookies.user_id = data.user.id;
                principal.authenticate(data.user);
                deferred.resolve(true);
            })
            .error(function (data, status, headers, config) {
                delete $cookies.token;
                deferred.reject(data);
            })

          return deferred.promise;
      },
      logout: function() {
          delete $cookies.token;
          principal.unsetIdentity();
      }
    };
  }
])

