function TransactionsCtrl($scope, $state, $stateParams, Api, payments) {
  $scope.payments = payments;

  $scope.pagination = {
    currentPage: $stateParams.page ? $stateParams.page : 1,
    maxSize: 5,
    totalItems: payments.headers['x-total-count'],
    itemsPerPage: payments.headers['x-per-page'],
    numPages: parseInt(payments.headers['x-total-count']/payments.headers['x-per-page'])
  };

  $scope.pageChanged = function () {
    $state.go('transactions', {page: $scope.pagination.currentPage});
  }

  // Export transactions
  $scope.exportData = function(format)
  {
    Api.Payments().export({format: format}, $stateParams, function(data, headers) {

      // Make the file download
      var url = URL.createObjectURL(new Blob([data.response.blob], {
        type: data.response.contentType
      }));
      var a = document.createElement('a');
      a.href = url;
      a.download = data.response.fileName;
      a.target = '_blank';
      a.click();
    }, function(response) {
      sweet.show({
        title: response.status + ' Ops!',
        text: response.data.message,
        confirmButtonText: 'Okej',
      });
    });
  }
}