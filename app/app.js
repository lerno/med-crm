'use strict';

angular.module('askCrm', [
  'ui.router',
  'askCrm.pay',
  'askCrm.members',
  'askCrm.api',
  'askCrm.login',
  'xeditable',
  'checklist-model',
  'ngCookies',
  'ngFileUpload'
])

.constant('APIURI', 'http://ask-crm-api.app/api/v1')

.config(['$urlRouterProvider', '$locationProvider', function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/login');

  $locationProvider.html5Mode(false);
}])

.filter('currentdate',['$filter',  function($filter) {
    return function() {
        return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
}])

.factory('principal', ['$q', '$http', '$timeout', '$cookies', 'Api',
  function($q, $http, $timeout, $cookies, Api) {
    var _identity = undefined,
      _authenticated = false;

    return {
      isIdentityResolved: function() {
        return angular.isDefined(_identity);
      },
      isAuthenticated: function() {
        return _authenticated;
      },
      isInRole: function(role) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i=0;i<_identity.roles.length;i++) {
          if( _identity.roles[i].name === role ) {
            return true;
          }
        }

        return false;
        return _identity.roles.indexOf(role) != -1;
      },
      isInAnyRole: function(roles) {
        if (!_authenticated || !_identity.roles) return false;

        for (var i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) return true;
        }

        return false;
      },
      authenticate: function(identity) {
        _identity = identity;
        _authenticated = identity != null;
      },
      unsetIdentity: function() {
        _identity = undefined;
        _authenticated = false;
      },
      identity: function(force) {
        var deferred = $q.defer();

        if (force === true) _identity = undefined;

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
          deferred.resolve(_identity);

          return deferred.promise;
        }

        Api.Users().get({id: $cookies.user_id}, function(data) {
            _identity = data;
            _authenticated = true;
            deferred.resolve(_identity);
        }, function(data){
            _identity = undefined;
            _authenticated = false;
            deferred.reject(data);
        });

        // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
        //                   $http.get('/svc/account/identity', { ignoreErrors: true })
        //                        .success(function(data) {
        //                            _identity = data;
        //                            _authenticated = true;
        //                            deferred.resolve(_identity);
        //                        })
        //                        .error(function () {
        //                            _identity = null;
        //                            _authenticated = false;
        //                            deferred.resolve(_identity);
        //                        });

        return deferred.promise;
      }
    };
  }
])

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

