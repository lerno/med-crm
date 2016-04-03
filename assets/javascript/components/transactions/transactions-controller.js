function TransactionsCtrl($scope, $state, $stateParams, payments) {
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
}