function MembersAddPaymentStepTwoCtrl ($scope, $sce, $stateParams, $http, member, paymentInfo) {

  $scope.items = paymentInfo.items;
  $scope.paymentMethod = paymentInfo.payment_method;

  if (paymentInfo.has_iframe_payment_form == true) {
    $scope.iframe = $sce.trustAsHtml(paymentInfo.next_url);
  } else {
    $scope.next_url = paymentInfo.next_url;
  }

  $scope.confirmPayment = function (e) {
//    e.preventDefault();

    $http.post($scope.next_url, {items: $scope.items, personal_number: $scope.personalNumber}, function() {

    });
  }

}