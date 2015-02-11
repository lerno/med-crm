function PersonsaddCtrl($scope, Api) {
  var person = new Api.Persons();
  
  $scope.submit = function() {
    console.log("SUBMIT");
    console.log( $scope.person );
    person.save($scope.person);
  };
  
}