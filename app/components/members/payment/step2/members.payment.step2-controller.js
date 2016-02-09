function MembersAddPaymentStepTwoCtrl ($scope, $sce, $stateParams, Api, member) {
  var info = Api.Members().getPaymentInfo($stateParams, function() {
    $scope.iframe = $sce.trustAsHtml(info.next_url);
  });
}