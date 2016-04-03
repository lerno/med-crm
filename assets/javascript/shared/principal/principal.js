angular.module('kPrincipal', [
  'ngCookies'
  ])

.factory('principal', ['$rootScope', '$q', '$http', '$timeout', '$cookies', 'Api', function($rootScope, $q, $http, $timeout, $cookies, Api) {
    var _identity = undefined,
      _authenticated = false,
      _isLookingForIdentity = false;

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
        $rootScope.currentUser = identity;
        _authenticated = identity != null;
        $rootScope.$broadcast('userAuthenticationChanged');
      },
      unsetIdentity: function() {
        _identity = undefined;
        _authenticated = false;
        $cookies.remove('token');
        $cookies.remove('user_id');
        $rootScope.currentUser = undefined;
        $rootScope.$broadcast('userAuthenticationChanged');
      },
      identity: function(force) {
        var deferred = $q.defer();

        if (force === true) _identity = undefined;

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
          deferred.resolve(_identity);

          return deferred.promise;
        }

        if (!$cookies.get('user_id')) {
          deferred.reject(undefined);
        } else {
          if (_isLookingForIdentity === true && force !== true) {
            var _d = $q.defer();
            $rootScope.$on('userAuthenticationChanged', function() {
              return _d.resolve(_identity);
            })
            return _d.promise;
          }

          var self = this;
          _isLookingForIdentity = true;

          Api.Users().get({id: $cookies.get('user_id')}, function(data) {
              self.authenticate(data);
              deferred.resolve(_identity);
              _isLookingForIdentity = false;
          }, function(data){
              self.unsetIdentity();
              deferred.reject(data);
              _isLookingForIdentity = false;
          });
        }

        return deferred.promise;
      }
    };
  }
])

