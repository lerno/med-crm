import angular from 'angular';

angular.module('kPrincipal', [
  'ngCookies',
])

  .factory('principal', ['$rootScope', '$q', '$http', '$timeout', '$cookies', 'Api', function PrincipalFactory($rootScope, $q, $http, $timeout, $cookies, Api) {
    let identity;
    let authenticated = false;
    let isLookingForIdentity = false;

    return {
      isIdentityResolved() {
        return angular.isDefined(identity);
      },
      isAuthenticated() {
        return authenticated;
      },
      isInRole(role) {
        if (!authenticated || !identity.roles) return false;

        for (let i = 0; i < identity.roles.length; i += 1) {
          if (identity.roles[i].name === role) {
            return true;
          }
        }

        return false;
      },
      isInAnyRole(roles) {
        if (!authenticated || !identity.roles) return false;

        for (let i = 0; i < roles.length; i += 1) {
          if (this.isInRole(roles[i])) return true;
        }

        return false;
      },
      authenticate(_identity) {
        identity = _identity;
        $rootScope.currentUser = identity;
        authenticated = identity != null;
        $rootScope.$broadcast('userAuthenticationChanged');
      },
      unsetIdentity() {
        identity = undefined;
        authenticated = false;
        $cookies.remove('token');
        $cookies.remove('user_id');
        $rootScope.currentUser = undefined;
        $rootScope.$broadcast('userAuthenticationChanged');
      },
      identity(force) {
        const deferred = $q.defer();

        if (force === true) identity = undefined;

        // check and see if we have retrieved the identity data from the server.
        // if we have, reuse it by immediately resolving
        if (angular.isDefined(identity)) {
          deferred.resolve(identity);

          return deferred.promise;
        }

        if (!$cookies.get('user_id')) {
          deferred.reject('You\'re not logged in.');
        } else {
          if (isLookingForIdentity === true && force !== true) {
            const defer = $q.defer();
            $rootScope.$on('userAuthenticationChanged', () => defer.resolve(identity));
            return defer.promise;
          }

          const self = this;
          isLookingForIdentity = true;

          Api.Users().get({ id: $cookies.get('user_id') }, (data) => {
            self.authenticate(data);
            deferred.resolve(identity);
            isLookingForIdentity = false;
          }, (data) => {
            self.unsetIdentity();
            deferred.reject(data);
            isLookingForIdentity = false;
          });
        }

        return deferred.promise;
      },
    };
  },
  ]);

