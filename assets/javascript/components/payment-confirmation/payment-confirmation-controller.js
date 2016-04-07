function PaymentConfirmationCtrl($scope, $state, $stateParams, $sce, Api) {
  var _split = $stateParams.klarna_order.split('/'),
      klarna_id = _split[_split.length-1];

  var payment = Api.Payments().query({
    external_id: klarna_id
  }, function () {
    if (payment.data.length > 0) {
      $scope.payment = payment.data[0];

      if ($scope.payment.next_url) {
        $scope.iframe = $sce.trustAsHtml($scope.payment.next_url);
      }
//      $state.go('members.addPayment.step3', {id: payment[0].member_id, payment_id:payment[0].id});
    }
  });
}