function MembersDetailCtrl ($scope, $filter, sweet, Api, member) {
  $scope.paymentMethods = [];
  $scope.member = member;
  $scope.countries = Api.Countries().query();
  $scope.genders = Api.Genders().query();
  $scope.roles = Api.Roles().query(function () {
    var _roles = [];
    angular.forEach($scope.member.user.roles, function(element, index) {
       var found = $filter('getById')($scope.roles, element.id);
       if (found) {
        _roles.push(found);
       }
    });
    $scope.member.user.roles = _roles;
  });

  $scope.savePerson = function () {
    $scope.member.$update();
  }

  $scope.saveUser = function () {
    var user = Api.Users().update($scope.member.user);
  }

  $scope.getPaymentReminders = function () {
    $scope.paymentReminders = Api.PaymentReminders().getForMember({member_id:member.id});
  }

  $scope.getPaymentReminders();

  $scope.sendPaymentReminder = function(id) {
    var reminder = Api.PaymentReminders().sendToMember({member_id: $scope.member.id}, function(data) {
        sweet.show('Skickat!', 'Ett mail har skickats till medlemmen för att påminna om att förlänga medlemskapet.', 'success');
        $scope.getPaymentReminders();
    });
  }

  $scope.loadPaymentMethods = function() {
    return $scope.paymentMethods.length ? null : Api.PaymentMethods().query(function(data) {
      $scope.paymentMethods = data;
    });
  };

  $scope.createUserForMember = function() {
    var user = Api.Users().save({member_id: $scope.member.id}, function () {
      $scope.member.user = user;
    })
  }

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