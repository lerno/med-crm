function MembersPaymentReminderButtonCtrl($scope, $state, sweet, Api) {

  // Action functions start
  $scope.sendPaymentReminders = function (method, force) {
    var members = [];

    if ($state.current.name == 'members.detail') {
      members.push($scope.member.id);
    } else {
      for (var i=0;i<$scope.members.data.length;i++) {
        if ($scope.members.data[i].selected == true) {
          members.push($scope.members.data[i].id);
        }
      }
    }

    Api.PaymentReminders().save({members: members, method:method, force:force}, function(data) {
      sweet.show('Sådär!', 'Då var påminnelserna postade! Bon apetit!', 'success');
    }, function(response) {
      sweet.show({
        title: response.status + ' Ops!',
        text: response.data.message,
        confirmButtonText: 'Ja, tvinga iväg ytterligare en påminnelse',
        showCancelButton: true,
        cancelButtonText: 'Okej, då vill jag inte skicka.'
      },
      function (didConfirm) {
        if (didConfirm) {
          $scope.sendPaymentReminders(method, true);
        }
      });
      console.log('response', response);
    });
  }

  $scope.sendPaymentRemindersInfo = function () {
    sweet.show({
      title: 'Skicka masspåminnelser!', 
      text: '<strong>Skicka med automatiskt valt medium:</strong> Påminnelser skickas i första hand genom sms (om medlemmen angivit telefonnummer) och i andra hand genom e-post. <br />' +
      '<strong>Skicka med sms:</strong> Påminnelser skickas enbart till markerade medlemmar med angivet mobilnummer. <br />' +
      '<strong>Skicka med e-post:</strong> Påminnelser skickas enbart till markerade medlemmar med angiven e-postadress', 
      html: true,
      type: 'info'
    });
  }
}