import angular from 'angular';
import 'angular-bootstrap';
import 'angular-xeditable';
import MembersDetailPersonCtrl from './members.detail.person-controller';

angular.module('askCrm.members.detail.person', [
  'xeditable',
  'ui.bootstrap',
])

  .controller('MembersDetailPersonCtrl', ['$scope', '$filter', '$timeout', '$state', 'SweetAlert', 'Api', 'member', MembersDetailPersonCtrl]);
