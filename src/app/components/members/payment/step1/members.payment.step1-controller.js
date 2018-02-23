export default function MembersAddPaymentStepOneCtrl($scope, Api, member) {
//  $scope.member = member;
//  console.log('e', member);

  $scope.$watch('member.birthdate', (v) => {
    console.log('GRATTIS');
    $scope.updatePrice();
  });

  $scope.paymentMethods = Api.PaymentMethods().query({
    online_payments: 1,
  });
}
