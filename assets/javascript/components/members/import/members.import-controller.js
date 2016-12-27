function MembersImportCtrl($scope, $timeout, $state, $log, Upload, sweet, APIURI) {

  $scope.uploadStatus;
  $scope.uploadServerResponseDone;

  $scope.$watch('file', function () {
    $scope.upload($scope.file);
  });

  $scope.upload = function (file) {
    if (!file) {
      return;
    }

    if (Upload.isUploadInProgress()) {
      sweet.show('Hold your horses!', 'En uppladdning är redan igång, vänta lite.', 'error');
      return;
    }

    if (!file.$error) {
      $scope.uploadServerResponseDone = false;
      
      var upload = Upload.upload({
        url: APIURI + '/members/import',
        data: {
          file: file  
        }
      });
      upload.then(function (resp) {
        $scope.uploadServerResponseDone = true;
        $timeout(function() {
          sweet.show('Importerat!', 'Medlemmarna har importerats i databasen.', 'success');
        });
      }, function (resp) {
        // Error
        $log.log(resp);
        sweet.show('Någonting gick fel!', 'Felkod ' + resp.status, 'error');
        $scope.uploadStatus = 'Någonting gick fel: ' + resp.status;
      }, function (evt) {
          var progressPercentage = parseInt(100.0 *
              evt.loaded / evt.total);
          $scope.log = evt.config.data.file.name + ' - ' + progressPercentage + 
            '% uppladdat';
          $log.log($scope.log);
          $scope.uploadStatus = $scope.log;
      });

//      upload.catch(errorCallback);
//upload.finally(callback, notifyCallback);

    }
  };
}