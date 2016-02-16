function MembersImportCtrl($scope, $timeout, $state, Upload, sweet, APIURI) {
  $scope.$watch('file', function () {
    $scope.upload($scope.file);
  });

  $scope.upload = function (file) {
    if (!file) {
      return;
    }

    if (!file.$error) {
      Upload.upload({
        url: 'http://ask-crm-api.app/api/v1/members/import',
        data: {
          file: file  
        }
      }).then(function (resp) {
          $timeout(function() {
            sweet.show('Importerat!', 'Medlemmarna har importerats i databasen.', 'success');
          });
      }, null, function (evt) {
          var progressPercentage = parseInt(100.0 *
              evt.loaded / evt.total);
          $scope.log = 'progress: ' + progressPercentage + 
            '% ' + evt.config.data.file.name + '\n' + 
            $scope.log;
      });
    }
  };
}