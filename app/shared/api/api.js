var apiUrl = 'http://ithora.pal.pp.se/ask.se/api/v1';


angular.module('askCrm.api', ['ngResource'])

.factory('Api', ['$resource', function($resource) {
  return {
    Persons: function() {
      var resource = $resource(apiUrl + '/persons.json/:id', { id:'@id' }, 
      {
        get: {
          isArray: true
        },
        update: {
          method: 'PUT'
        }
      });
      return resource;
    }
  }
}]);