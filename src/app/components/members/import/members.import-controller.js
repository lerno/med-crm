export default function MembersImportCtrl($scope, $timeout, $state, $log, Upload, sweet, APIURI) {
  $scope.uploadStatus;
  $scope.uploadServerResponseDone;

  $scope.$watch('file', () => {
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

      const upload = Upload.upload({
        url: `${APIURI}/members/import`,
        data: {
          file,
        },
      });
      upload.then((resp) => {
        $scope.uploadServerResponseDone = true;
        $timeout(() => {
          sweet.show('Importerat!', 'Medlemmarna har importerats i databasen.', 'success');
        });
      }, (resp) => {
        // Error
        $log.log(resp);
        sweet.show('Någonting gick fel!', `Felkod ${resp.status}`, 'error');
        $scope.uploadStatus = `Någonting gick fel: ${resp.status}`;
      }, (evt) => {
        const progressPercentage = parseInt(100.0 *
              evt.loaded / evt.total);
        $scope.log = `${evt.config.data.file.name} - ${progressPercentage
        }% uppladdat`;
        $log.log($scope.log);
        $scope.uploadStatus = $scope.log;
      });

      //      upload.catch(errorCallback);
      // upload.finally(callback, notifyCallback);
    }
  };
}
