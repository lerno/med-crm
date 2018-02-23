import angular from 'angular';

angular.module('kPrincipal', [
  'ngCookies',
])

  .factory('principal', ['$rootScope', '$q', '$http', '$timeout', '$cookies', 'Api', function ($rootScope, $q, $http, $timeout, $cookies, Api) {
    let _identity,
      _authenticated = false,
      _isLookingForIdentity = false;

    return {
      isIdentityResolved() {
        return angular.isDefined(_identity);
      },
      isAuthenticated() {
        return _authenticated;
      },
      isInRole(role) {
        if (!_authenticated || !_identity.roles) return false;

        for (let i = 0; i < _identity.roles.length; i++) {
          if (_identity.roles[i].name === role) {
            return true;
          }
        }

        return false;
      },
      isInAnyRole(roles) {
        if (!_authenticated || !_identity.roles) return false;

        for (let i = 0; i < roles.length; i++) {
          if (this.isInRole(roles[i])) return true;
        }

        return false;
      },
      authenticate(identity) {
        _identity = identity;
        $rootScope.currentUser = identity;
        _authenticated = identity != null;
        $rootScope.$broadcast('userAuthenticationChanged');
      },
      unsetIdentity() {
        _identity = undefined;
        _authenticated = false;
        $cookies.remove('token');
        $cookies.remove('user_id');
        $rootScope.currentUser = undefined;
        $rootScope.$broadcast('userAuthenticationChanged');
      },
      identity(force) {
        const deferred = $q.defer();

        if (force === true) _identity = undefined;

        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
        if (angular.isDefined(_identity)) {
          deferred.resolve(_identity);

          return deferred.promise;
        }

        if (!$cookies.get('user_id')) {
          deferred.reject('You\'re not logged in.');
        } else {
          if (_isLookingForIdentity === true && force !== true) {
            const _d = $q.defer();
            $rootScope.$on('userAuthenticationChanged', () => _d.resolve(_identity));
            return _d.promise;
          }

          const self = this;
          _isLookingForIdentity = true;

          Api.Users().get({ id: $cookies.get('user_id') }, (data) => {
            self.authenticate(data);
            deferred.resolve(_identity);
            _isLookingForIdentity = false;
          }, (data) => {
            self.unsetIdentity();
            deferred.reject(data);
            _isLookingForIdentity = false;
          });
        }

        return deferred.promise;
      },
    };
  },
  ]);

