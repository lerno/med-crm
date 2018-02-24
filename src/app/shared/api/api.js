import angular from 'angular';
import 'angular-resource';
import 'angular-cookies';

angular.module('medCrm.api', [
  'ngResource',
  'ngCookies',
])

  .factory('authInterceptor', ['$rootScope', '$q', '$cookies', function ApiAuthInterceptorFactory($rootScope, $q, $cookies) {
    return {
      request(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = `Bearer ${$cookies.get('token')}`;
        }
        return config;
      },
      response(response) {
        return response || $q.when(response);
      },
      responseError(rejection) {
        $rootScope.$broadcast('httpRejection', rejection);
        switch (rejection.status) {
          case 400: // Not auth
            if (!$cookies.get('token')) {
              //            $cookies.remove('token');
            }
            break;
        }

        return $q.reject(rejection);
      },
    };
  }])

  .config(['$httpProvider', function ApiConfig($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }])

  .factory('Api', ['$rootScope', '$resource', 'APIURI', function ApiFactory($rootScope, $resource, APIURI) {
    function transformResponseForFileDownload(data, headers) {
      function getFileNameFromHttpHeaders(httpHeaders) {
        const contentDispositionHeader = httpHeaders('Content-Disposition');
        const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
        return result.replace(/"/g, '');
      }

      let file = null;
      if (data) {
        file = new Blob([data], {
          type: headers('Content-Type'),
        });
      }

      // server should sent content-disposition header
      const fileName = getFileNameFromHttpHeaders(headers);
      const result = {
        blob: file,
        contentType: headers('Content-Type'),
        fileName,
      };

      return {
        response: result,
      };
    }

    return {

      Users() {
        return $resource(
          `${APIURI}/users/:id`, { id: '@id' },
          {
            update: {
              method: 'PUT',
            },
          },
        );
      },

      Passwords() {
        return $resource(
          `${APIURI}/password`, {},
          {
            email: {
              method: 'POST',
              url: `${APIURI}/password/email`,
            },
            reset: {
              method: 'POST',
              url: `${APIURI}/password/reset`,
              isArray: true,
            },
          },
        );
      },

      Members() {
        return $resource(
          `${APIURI}/members/:id`, { id: '@id' },
          {
            query: {
              transformResponse(data, headers) {
                const response = {};
                response.data = JSON.parse(data);
                response.headers = headers();
                return response;
              },
            },
            update: {
              method: 'PUT',
            },
            getPaymentInfo: {
              method: 'GET',
              url: `${APIURI}/members/:id/pay/:payment_method_id`,
            },
            getMembershipPrice: {
              method: 'GET',
              url: `${APIURI}/members/:id/membership-price`,
            },
            bulkUpdate: {
              method: 'PUT',
              url: `${APIURI}/members/bulk-update`,
            },
            export: {
              method: 'POST',
              url: `${APIURI}/members/export/:format`,
              responseType: 'arraybuffer',
              headers: {
                accept: ['application/vnd.ms-excel', 'text/csv'],
              },
              cache: false,
              transformResponse: transformResponseForFileDownload,
            },
          },
        );
      },

      PaymentReminders() {
        return $resource(
          `${APIURI}/payment-reminders`, {
            member_id: '@member_id',
            force: '@force',
          },
          {
            getForMember: {
              method: 'GET',
              url: `${APIURI}/members/:member_id/payment-reminders`,
              isArray: true,
            },
            sendToMember: {
              method: 'POST',
              url: `${APIURI}/members/:member_id/payment-reminders`,
            },
          },
        );
      },

      Genders() {
        return $resource(`${APIURI}/genders`, {});
      },

      Cities() {
        return $resource(`${APIURI}/cities.json/:id`);
      },

      Countries() {
        return $resource(`${APIURI}/countries`, {});
      },

      PaymentMethods() {
        return $resource(`${APIURI}/payment-methods`, {});
      },

      Roles() {
        return $resource(`${APIURI}/roles`);
      },

      Payments() {
        return $resource(`${APIURI}/payments/:id`, { id: '@id' }, {
          query: {
            transformResponse(data, headers) {
              const response = {};
              response.data = JSON.parse(data);
              response.headers = headers();
              return response;
            },
          },
          getNextUrl: {
            method: 'GET',
            url: `${APIURI}/payments/get-next-url/:externalId`,
          },
          export: {
            method: 'POST',
            url: `${APIURI}/payments/export/:format`,
            responseType: 'arraybuffer',
            headers: {
              accept: ['application/vnd.ms-excel', 'text/csv'],
            },
            cache: false,
            transformResponse: transformResponseForFileDownload,
          },
        });
      },
    };
  }]);
