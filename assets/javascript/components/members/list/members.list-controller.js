function MembersListCtrl($scope, $state, $stateParams, $location, $timeout, sweet, Api, members) {
  $scope.members = members;
  $scope.pagination = {
    currentPage: $stateParams.page ? $stateParams.page : 1,
    maxSize: 5,
    totalItems: members.headers['x-total-count'],
    itemsPerPage: members.headers['x-per-page'],
    numPages: parseInt(members.headers['x-total-count']/members.headers['x-per-page'])
  };

  // Select all members
  $scope.selectAll = function () {
    angular.forEach($scope.members.data, function(value, key) {
      $scope.members.data[key].selected = $scope.allMembersSelected;
    });
  };

  // Used for disabling action buttons
  $scope.selectedFilter = function (object) {
    return object.selected === true;
  };

  // Set filter options
  $scope.filterOptions = [
    {
      name: 'Personnummer',
      value: 'personal_number'
    },
    {
      name: 'E-post',
      value: 'email'
    },
    {
      name: 'Efternamn',
      value: 'last_name'
    },
  ];

  var currentFilter = $scope.filterOptions.find(function(_obj){ return typeof $stateParams[_obj.value] !== 'undefined'; });

  if (currentFilter) {
    $scope.filterType = currentFilter;
    $scope.filterQuery = $stateParams[currentFilter.value];
  } else {
    $scope.filterType = $scope.filterOptions[0];
  }

  // Set scope variables for sort parameters
  var sortParams = ['id', 'personal_number'];

  for (var i=0;i<sortParams.length;i++) {
    var _prop = 'sortBy' + sortParams[i][0].toUpperCase() + sortParams[i].slice(1);

    if (sortParams[i] === 'id') {
      $scope[_prop] = $stateParams.sort === '-' + sortParams[i] ? sortParams[i] : '-' + sortParams[i];
    } else {
      $scope[_prop] = $stateParams.sort === sortParams[i] ? '-' + sortParams[i] : sortParams[i];
    }
  }

  // Pagination
  $scope.pageChanged = function () {
    $state.go('members.list', {page: $scope.pagination.currentPage});
  }

  $scope.goToMember = function (id) {
    $state.go('members.detail', {id: id});
  }

  $scope.goToMemberEdit = function (id) {
    $state.go('members.edit', {id: id});
  }

  // Action functions start
  $scope.sendPaymentReminders = function () {
    var members = [];
    for (var i=0;i<$scope.members.data.length;i++) {
      if ($scope.members.data[i].selected == true) {
        members.push($scope.members.data[i].id);
      }
    }

    Api.PaymentReminders().save({members: members}, function(data) {
      sweet.show('Sådär!', 'Då var påminnelserna postade! Bon apetit!', 'success');
    });
  }
  // Action functions end

  $scope.search = function () {
    $location.search($scope.filterType.value, $scope.filterQuery);
    return;
    var _params = {};
    _params[$scope.filterType.value] = $scope.filterQuery;
    $state.go($state.current, _params, {
      reload: true,
      notify: true,
      inherit: false
    });
  }

  $scope.resetLocation = function (resetKey) {
    $state.current.reloadOnSearch = false;

    $location.search(resetKey, null);
    $scope.filterQuery = null;

    $timeout(function () {
      $state.current.reloadOnSearch = true;
    })
  }
}