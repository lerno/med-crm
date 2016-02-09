function PayParseTokenCtrl($scope, $stateParams, Api) {
  var paymentReminder = Api.Members().getPaymentReminder($stateParams);

  console.log('paymentReminder', paymentReminder);
}