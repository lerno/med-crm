export default function PayParseTokenCtrl($scope, $stateParams, Api) {
  const paymentReminder = Api.Members().getPaymentReminder($stateParams);

  console.log('paymentReminder', paymentReminder);
}
