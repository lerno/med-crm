import angular from 'angular';
import MembersPaymentReminderButtonCtrl from './members.payment-reminder-button-controller';

angular.module('askCrm.members.paymentReminderButton', [
  'askCrm.api',
  'ui.bootstrap.dropdown',
  'oitozero.ngSweetAlert',
])

  .controller('MembersPaymentReminderButtonCtrl', ['$scope', '$state', 'SweetAlert', 'Api', MembersPaymentReminderButtonCtrl]);

