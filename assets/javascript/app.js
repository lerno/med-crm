angular.module('templates', []);

'use strict';

var askCrm = angular.module('askCrm', [
  'permission',
  'ui.router',
  'ui.bootstrap',
  'templates',
//  'askCrm.pay',
  'askCrm.members',
  'askCrm.api',
  'askCrm.login',
  'askCrm.paymentConfirmation',
  'kPrincipal',
  'xeditable',
  'checklist-model',
  'ngCookies',
  'ngFileUpload',
  'hSweetAlert'
])

askCrm.constant('APIURI', appConfig.apiUri)

.config(['$urlRouterProvider', '$locationProvider', '$cookiesProvider', function($urlRouterProvider, $locationProvider, $cookiesProvider) {
  $urlRouterProvider.otherwise('/login');

  $locationProvider.html5Mode(appConfig.html5Mode);

  $cookiesProvider.defaults.path = '/';
}])

.run(['$rootScope', '$q', 'sweet', 'PermissionStore', 'principal', function ($rootScope, $q, sweet, PermissionStore, principal) {

  $rootScope.$on('httpRejection', function(event, args) {
    switch (args.status) {
      case 401:
        sweet.show('Oops...', 'Du har inte rättighet till denna sida.', 'error');
      break;
      default:
        sweet.show('Oops...', 'Någonting gick fel: ' + args.data.message, 'error');
      break;
    }
  })

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

.factory('authorization', ['$rootScope', '$state', '$q', '$http', '$cookies', 'principal', 'Api', 'APIURI',
  function($rootScope, $state, $q, $http, $cookies, principal, Api, APIURI) {
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
      loginWithToken: function(token) {
        var deferred = $q.defer();
        $http.defaults.headers.common['Authorization'] = 'Bearer: ' + token;

        var user = Api.Users().get({id: 'me'}, function () {
          $cookies.put('token', token);
          $cookies.put('user_id', user.id);
          principal.authenticate(user);

          deferred.resolve(user);
        }, function (data) {
          deferred.reject(data);
        });
        return deferred.promise;
      },
      login: function(_user) {
          var deferred = $q.defer();

          $http
            .post(APIURI + '/authentication', _user)
            .success(function (data, status, headers, config) {
                $cookies.put('token', data.token);
                $cookies.put('user_id', data.user.id);
                principal.authenticate(data.user);
                deferred.resolve(true);
            })
            .error(function (data, status, headers, config) {
                $cookies.remove('token');
                deferred.reject(data);
            })

          return deferred.promise;
      },
      logout: function() {
          principal.unsetIdentity();
      }
    };
  }
])

