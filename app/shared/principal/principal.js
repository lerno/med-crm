angular.module('kPrincipal', [])

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
        console.log('isInRole', role);
        console.log('_identity.roles', _identity);
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

