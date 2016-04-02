function MembersListCtrl($scope, $state, $stateParams, $location, $timeout, sweet, Api, members) {
  $scope.members = members;
  $scope.pagination = {
    currentPage: $stateParams.page ? $stateParams.page : 1,
    maxSize: 5,
    totalItems: members.headers['x-total-count'],
    itemsPerPage: members.headers['x-per-page'],
    numPages: parseInt(members.headers['x-total-count']/members.headers['x-per-page'])
  };

  $scope.$on('$locationChangeSuccess', function(){
    $scope.members = Api.Members().query($stateParams);
  });

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
    console.log('currentFilter', currentFilter);
    $scope.filterType = currentFilter;
    $scope.filterQuery = $stateParams[currentFilter.value];
  } else {
    $scope.filterType = $scope.filterOptions[0];
  }

  // Set scope variables for sort parameters
  var sortParams = ['member_number', 'member_until'];

  $scope.$on('$locationChangeStart', function(event, toState, toParams, fromState, fromParams) {
    for (var i=0;i<sortParams.length;i++) {
      var _prop = 'sortBy' + sortParams[i][0].toUpperCase() + sortParams[i].slice(1);
/*
      if (sortParams[i] === 'member_number') {
        $scope[_prop] = $stateParams.sort === '-' + sortParams[i] ? sortParams[i] : '-' + sortParams[i];
      } else {
        $scope[_prop] = $stateParams.sort === sortParams[i] ? '-' + sortParams[i] : sortParams[i];
      }
*/
      $scope[_prop] = $stateParams.sort === sortParams[i] ? '-' + sortParams[i] : sortParams[i];
    }

  });

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

  // Select all members
  $scope.selectAll = function () {
    angular.forEach($scope.members.data, function(value, key) {
      $scope.members.data[key].selected = $scope.allMembersSelected;
    });
  };

  // Action functions start
  $scope.sendPaymentReminders = function (method) {
    var members = [];
    for (var i=0;i<$scope.members.data.length;i++) {
      if ($scope.members.data[i].selected == true) {
        members.push($scope.members.data[i].id);
      }
    }

    Api.PaymentReminders().save({members: members, method:method}, function(data) {
      sweet.show('Sådär!', 'Då var påminnelserna postade! Bon apetit!', 'success');
    });
  }

  $scope.sendPaymentRemindersInfo = function () {
    sweet.show({
      title: 'Skicka masspåminnelser!', 
      text: '<strong>Skicka med automatiskt valt medium:</strong> Påminnelser skickas i första hand genom sms (om medlemmen angivit telefonnummer) och i andra hand genom e-post. <br />' +
      '<strong>Skicka med sms:</strong> Påminnelser skickas enbart till markerade medlemmar med angivet mobilnummer. <br />' +
      '<strong>Skicka med e-post:</strong> Påminnelser skickas enbart till markerade medlemmar med angiven e-postadress', 
      html: true,
      type: 'info'
    });
  }

  // Action functions end

  $scope.isFilterEnabled = function (filter) {
    return typeof $location.$$search[filter] !== 'undefined';
  }

  $scope.toggleFilter = function (filter) {
    if (!$scope.isFilterEnabled(filter)) {
      $location.search(filter, 'true');
    } else {
      $location.search(filter, null);
    }
  }

  $scope.search = function () {
    $location.search($scope.filterType.value, $scope.filterQuery);
  }

  $scope.resetLocation = function (resetKey) {
    console.log('reset', resetKey);
    $location.search('')
//    $location.search(resetKey, null);
    return;
    $state.current.reloadOnSearch = false;

    $scope.filterQuery = null;

    $timeout(function () {
      $state.current.reloadOnSearch = true;
    })
  }
}