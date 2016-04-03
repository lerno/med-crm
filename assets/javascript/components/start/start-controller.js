function StartCtrl($scope, $timeout, principal) {
  $timeout(function() {
    console.log(principal.isAuthenticated());
  });
  principal.identity().then(function(data) {
    console.log('data', data);
  });
}