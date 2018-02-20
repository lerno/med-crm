export default function StartCtrl($scope, $timeout, principal) {
  $timeout(() => {
    console.log(principal.isAuthenticated());
  });
  principal.identity().then((data) => {
    console.log('data', data);
  });
}
