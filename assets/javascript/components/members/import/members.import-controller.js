function MembersImportCtrl($scope, $timeout, $state, Upload, Api) {
  $scope.$watch('file', function () {
    console.log('file change');
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
              $scope.log = 'file: ' +
              resp.config.data.file.name +
              ', Response: ' + JSON.stringify(resp.data) +
              '\n' + $scope.log;
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