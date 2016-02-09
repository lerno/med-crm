function MembersAddPaymentStepOneCtrl($scope, Api, member) {
  console.log('e');
  $scope.paymentMethods = Api.PaymentMethods().query({
    online_payments: 1
  });
}