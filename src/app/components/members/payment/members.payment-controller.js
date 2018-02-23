export default function MembersAddPaymentCtrl($scope, Api, member, price) {
  $scope.member = member;
  $scope.price = price;

  $scope.updatePrice = function () {
    Api.Members().getMembershipPrice({ id: $scope.member.id }, (data) => {
      console.log('PRICE', data);
      $scope.price = data;
    });
  };
}
