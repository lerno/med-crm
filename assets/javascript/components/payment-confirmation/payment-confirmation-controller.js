function PaymentConfirmationCtrl($scope, $state, $stateParams, Api) {
  var _split = $stateParams.klarna_order.split('/'),
      klarna_id = _split[_split.length-1];

  var payment = Api.Payments().query({
    external_id: klarna_id
  }, function () {
    if (payment.length > 0) {
      $scope.payment = payment[0];
//      $state.go('members.addPayment.step3', {id: payment[0].member_id, payment_id:payment[0].id});
    }
  });
}