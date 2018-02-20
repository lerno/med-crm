export default function PaymentConfirmationCtrl($scope, $state, $stateParams, $sce, Api, klarnaId, nextUrl) {
  $scope.iframe = $sce.trustAsHtml(nextUrl.next_url);
  var payment = Api.Payments().query({
    external_id: klarnaId,
  }, () => {
    if (payment.data.length > 0) {
      $scope.payment = payment.data[0];

      if ($scope.payment.next_url) {
      }
      //      $state.go('members.addPayment.step3', {id: payment[0].member_id, payment_id:payment[0].id});
    }
  });
}
