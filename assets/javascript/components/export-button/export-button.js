import angular from 'angular';
import 'angular-sweetalert';
import 'angular-ui-bootstrap';
import '../../shared/api/api';
import ExportButtonCtrl from './export-button-controller';

angular.module('askCrm.exportButton', [
  'askCrm.api',
  'ui.bootstrap.dropdown',
  'oitozero.ngSweetAlert',
])

  .controller('ExportButtonCtrl', ['$scope', '$state', 'SweetAlert', 'Api', ExportButtonCtrl]);

