function MembersAddPaymentStepOneCtrl($scope, Api, member) {
  $scope.member = member;
  $scope.member.birthdate = new Date(1984, 4, 15);
  console.log('e', member);
  $scope.paymentMethods = Api.PaymentMethods().query({
    online_payments: 1
  });
}