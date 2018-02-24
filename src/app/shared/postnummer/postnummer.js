import angular from 'angular';

angular.module('medCrm.postnummer', ['ngResource'])

  .config(['$resourceProvider', '$httpProvider', function PostnummerConfig($resourceProvider, $httpProvider) {
  // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .factory('Postnummer', ['$resource', function PostnummerFactory($resource) {
    return $resource('http://yourmoneyisnowmymoney.com/api/zipcodes/');
  }]);
