window.addEventListener('unhandledrejection', (event) => {
  // Prevent error output on the console:
  event.preventDefault();
  console.log(`Reason: ${event.reason}`);
});

import angular from 'angular';
import 'angular-permission';
import '@uirouter/angularjs';
import 'angular-bootstrap';
import 'angular-xeditable';
import 'checklist-model';
import 'angular-cookies';
import 'ng-file-upload';
import 'angular-sweetalert';
import 'angular-loader';
import 'angular-loading-bar';

import './components/start/start.js';
import './components/members/members.js';
import './components/login/login.js';
import './components/dashboard/dashboard.js';
import './components/transactions/transactions.js';
import './components/pay/pay.js';
import './components/payment-confirmation/payment-confirmation.js';
import './shared/principal/principal';
import appConfig from './config';

angular.module('templates', []);

'use strict';

const medCrm = angular.module('medCrm', [
  'permission',
  'ui.router',
  'ui.bootstrap',
  'templates',
  'medCrm.start',
  'medCrm.members',
  'medCrm.api',
  'medCrm.login',
  'medCrm.dashboard',
  'medCrm.payments',
  'medCrm.paymentConfirmation',
  'kPrincipal',
  'xeditable',
  'checklist-model',
  'ngCookies',
  'ngFileUpload',
  'oitozero.ngSweetAlert',
  'angular-loading-bar',
]);

medCrm.constant('APIURI', appConfig.apiUrl)

  .config(['$urlRouterProvider', '$locationProvider', '$cookiesProvider', '$logProvider', 'cfpLoadingBarProvider', '$qProvider', function ($urlRouterProvider, $locationProvider, $cookiesProvider, $logProvider, cfpLoadingBarProvider) {
    $urlRouterProvider.otherwise(($injector) => {
      const $state = $injector.get('$state');

      $state.go('start');
    });

    $locationProvider.html5Mode(appConfig.html5Mode);

    $cookiesProvider.defaults.path = '/';

    $logProvider.debugEnabled(appConfig.debugModeEnabled);

    cfpLoadingBarProvider.includeSpinner = false;
  }])

  .filter('getById', () => function (input, id) {
    let i = 0,
      len = input.length;
    for (; i < len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  })

  .run(['$rootScope', '$q', '$state', 'SweetAlert', 'PermissionStore', 'editableOptions', 'editableThemes', 'principal', function ($rootScope, $q, $state, sweet, PermissionStore, editableOptions, editableThemes, principal) {
    $rootScope.$on('httpRejection', (event, args) => {
      switch (args.status) {
        case 401:
          sweet.show('Oops...', 'Du har inte rättighet till denna sida.', 'error');
          break;
        default:
          var message;

          if (args.data && typeof args.data.message !== 'undefined') {
            message = args.data.message;
          } else {
            message = `HTTP-status ${args.status}`;
          }

          sweet.show('Oops...', `Någonting gick fel: ${message}`, 'error');
          break;
      }
    });

    $rootScope.$on('$stateChangePermissionDenied', (event, toState, toParams, options) => {
      sweet.show({
        title: 'Oops...',
        text: 'Du har inte rättighet till denna sida.',
        type: 'error',
      }, () => {
        $state.go('start');
      });
    });

    // Check if we're logged in
    principal.identity()
      .catch((error) => {
        console.error('Failed to authenticate due to', error);
      });

    // Define anonymous permission
    PermissionStore
      .definePermission('anonymous', (stateParams) => {
        const deferred = $q.defer();
        principal.identity().then(() => {
        // If the returned value is *truthy* then the user has the permission, otherwise they don't
          if (!principal.isAuthenticated) {
            return deferred.resolve(); // Is anonymous
          }
          return deferred.reject();
        });
        return deferred.promise;
      });
    PermissionStore
      .definePermission('admin', (stateParams) => {
        const deferred = $q.defer();
        principal.identity().then(() => {
          if (principal.isInRole('admin')) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, () => {
        // The identity check got rejected
          deferred.reject();
        });
        return deferred.promise;
      });

    editableOptions.theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-sm';
  }])

  .filter('currentdate', ['$filter', function ($filter) {
    return function () {
      return $filter('date')(new Date(), 'yyyy-MM-dd');
    };
  }])

  .factory('authorization', ['$rootScope', '$state', '$q', '$http', '$cookies', 'principal', 'Api', 'APIURI',
    function ($rootScope, $state, $q, $http, $cookies, principal, Api, APIURI) {
      return {
        authorize() {
          return principal.identity()
            .then((data) => {
              const isAuthenticated = principal.isAuthenticated();
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
            }, (reason) => {
              // If we couldn't get the user data
              $state.go('login');
            });
        },
        loginWithToken(token) {
          const deferred = $q.defer();
          $http.defaults.headers.common.Authorization = `Bearer ${token}`;

          var user = Api.Users().get({ id: 'me' }, () => {
            $cookies.put('token', token);
            $cookies.put('user_id', user.id);
            principal.authenticate(user);

            deferred.resolve(user);
          }, (data) => {
            deferred.reject(data);
          });
          return deferred.promise;
        },
        login(_user) {
          const deferred = $q.defer();

          $http
            .post(`${APIURI}/authentication`, _user)
            .success((data, status, headers, config) => {
              $cookies.put('token', data.token);
              $cookies.put('user_id', data.user.id);
              principal.authenticate(data.user);
              deferred.resolve(true);
            })
            .error((data, status, headers, config) => {
              $cookies.remove('token');
              deferred.reject(data);
            });

          return deferred.promise;
        },
        logout() {
          principal.unsetIdentity();
        },
      };
    },
  ]);

