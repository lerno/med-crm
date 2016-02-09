function MembersDetailCtrl ($scope, Api, member) {
  $scope.paymentMethods = [];
  $scope.member = member;

  $scope.sendPaymentReminder = function(id) {
    $scope.member.$sendPaymentReminder();
  }

  $scope.loadPaymentMethods = function() {
    return $scope.paymentMethods.length ? null : Api.PaymentMethods().query(function(data) {
      $scope.paymentMethods = data;
    });
  };

  $scope.showPayMethod = function(payment) {
    if(payment.group && $scope.groups.length) {
      var selected = $filter('filter')($scope.groups, {id: member.group});
      return selected.length ? selected[0].text : 'Not set';
    } else {
      return member.groupName || 'Not set';
    }
  };

  $scope.addPayment = function () {
    var today = new Date();

    $scope.insertedPayment = {
      payment_date: today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate(),
      amount: 0,
      method: ''
    }

    $scope.member.payments.push($scope.insertedPayment);
  }

  $scope.savePayment = function (data) {
    console.log('data', data);
    data.member_id = member.id;
    if (data.id) {
      data.$update();
    } else {
      Api.Payments().save(data);
    }
  }
}