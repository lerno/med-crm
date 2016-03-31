function MembersAddPaymentStepOneCtrl($scope, Api, member) {
  $scope.paymentMethods = Api.PaymentMethods().query({
    online_payments: 1
  });
}