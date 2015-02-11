function PersonseditCtrl($scope, Api, person) {
  person.$promise.then(function(data) {
    $scope.person = data[0];
  });
  
  $scope.submit = function() {
    Api.Persons().update($scope.person, function(data) {
      console.log("UPDATED");
    });
  };
  
}