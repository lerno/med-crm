angular.module('askCrm.api', [
  'ngResource',
  'ngCookies',
  'askCrm'
])

.factory('authInterceptor', ['$rootScope', '$q', '$cookies', function ($rootScope, $q, $cookies) {

  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($cookies.get('token')) {
        config.headers['Authorization'] = 'Bearer: ' + $cookies.get('token');
      }
      return config;
    },
    response: function (response) {
      return response || $q.when(response);
    },
    responseError: function (rejection) {
      $rootScope.$broadcast('httpRejection', rejection);
      switch(rejection.status) {
        case 400: // Not auth
          if(!$cookies.get('token')) {
//            $cookies.remove('token');
          }
        break;
      }

      return $q.reject(rejection);
    }
  };
}])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}])

.factory('Api', ['$rootScope', '$resource', 'APIURI', function($rootScope, $resource, APIURI) {

  return {

    Users: function() {
      return $resource(APIURI + '/users/:id', {id:'@id'}, 
      {
        update: {
          method: 'PUT'
        }
      });
    },

    Passwords: function() {
      return $resource(APIURI + '/password', {}, 
      {
        email: {
          method: 'POST',
          url: APIURI + '/password/email'
        },
        reset: {
          method: 'POST',
          url: APIURI + '/password/reset',
          isArray: true
        }
      })
    },

    Members: function() {
      return $resource(APIURI + '/members/:id', { id:'@id' }, 
      {
        query: {
          transformResponse: function(data, headers) {
            response = {}
            response.data = JSON.parse(data);
            response.headers = headers();
            return response;
          }
        },
        update: {
          method: 'PUT'
        },
        getPaymentInfo: {
          method: 'GET',
          url: APIURI + '/members/:id/pay/:payment_method_id'
        },
        getMembershipPrice: {
          method: 'GET',
          url: APIURI + '/members/:id/membership-price'
        },
        bulkUpdate: {
          method: 'PUT',
          url: APIURI + '/members/bulk-update'
        }
      });
    },

    PaymentReminders: function () {
      return $resource(APIURI + '/payment-reminders', {
        member_id: '@member_id',
        force: '@force'
      }, 
      {
        getForMember: {
          method: 'GET',
          url: APIURI + '/members/:member_id/payment-reminders',
          isArray: true
        },
        sendToMember: {
          method: 'POST',
          url: APIURI + '/members/:member_id/payment-reminders'
        },
      })
    },

    Genders: function() {
      return $resource(APIURI + '/genders', {});
    },

    Cities: function() {
      return $resource(APIURI + '/cities.json/:id');
    },

    Countries: function() {
      return $resource(APIURI + '/countries', {});
    },

    PaymentMethods: function() {
      return $resource(APIURI + '/payment-methods', {});
    },

    Roles: function() {
      return $resource(APIURI + '/roles');
    },

    Payments: function() {
      return $resource(APIURI + '/payments/:id', {id: '@id'}, {
        query: {
          transformResponse: function(data, headers) {
            response = {}
            response.data = JSON.parse(data);
            response.headers = headers();
            return response;
          }
        },
        getNextUrl: {
          method: 'GET',
          url: APIURI + '/payments/get-next-url/:externalId'
        }
      })
    }
  }
}]);