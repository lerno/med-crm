import angular from 'angular';
import MembersPaymentReminderButtonCtrl from './members.payment-reminder-button-controller';

angular.module('medCrm.members.paymentReminderButton', [
  'medCrm.api',
  'ui.bootstrap.dropdown',
  'oitozero.ngSweetAlert',
])

  .controller('MembersPaymentReminderButtonCtrl', ['$scope', '$state', 'SweetAlert', 'Api', MembersPaymentReminderButtonCtrl]);

