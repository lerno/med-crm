function PaymentsCtrl($scope, $state, $stateParams, Api) {
  var _split = $stateParams.klarna_order.split('/'),
      klarna_id = _split[_split.length-1];
  console.log('$stateParams', klarna_id); 

  var payment = Api.Payments().query({
    external_id: klarna_id
  }, function () {
    console.log('payment.member_id', payment[0].member_id);
    $state.go('members.addPayment.step3', {id: payment[0].member_id});
  });
}