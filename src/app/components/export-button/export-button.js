import angular from 'angular';
import 'angular-sweetalert';
import 'angular-ui-bootstrap';
import '../../shared/api/api';
import ExportButtonCtrl from './export-button-controller';

angular.module('medCrm.exportButton', [
  'medCrm.api',
  'ui.bootstrap.dropdown',
  'oitozero.ngSweetAlert',
])

  .controller('ExportButtonCtrl', ['$scope', '$state', 'SweetAlert', 'Api', ExportButtonCtrl]);

