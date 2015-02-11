function PersonsCtrl($scope, $resource, $timeout, ngTableParams, Api) {

  $scope.tableParams = new ngTableParams({
    page: 1,            // show first page
    count: 10,          // count per page
    sorting: {
      id: 'asc'     // initial sorting
    }
  }, {
    total: 0,           // length of data
    getData: function($defer, params) {
      // ajax request to api
      console.log(params);
      Api.Persons().query(function(data) {
        $timeout(function() {
          // update table params
//          params.total(data.total);
          // set new data
          $defer.resolve(data);
        }, 500);
      });
    }
  });
  /*
  // Show the user data from the promise
  persons.$promise.then(function(data) {
    $scope.persons = data;
  });
  */
}