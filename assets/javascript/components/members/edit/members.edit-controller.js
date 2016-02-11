function MembersEditCtrl($scope, Api, member) {
  $scope.member = {};
  $scope.countries;
  $scope.cities;
  $scope.genders;
  $scope.paymentMethods;
//  $scope.roles;
  
  $scope.pickadateOptions = {
    format: 'yyyy-mm-dd',
    firstDay: 1,
    selectYears: true,
    selectMonths: true
  }

  if (member) {
    $scope.member = member;
  }

  // Get the genders
  $scope.genders = Api.Genders().query();
  console.log('$scope.genders', $scope.genders);

  // Get the countries
  Api.Countries().query(function(data) {
    if (!$scope.member.country_id) {
      $scope.member.country_id = 205;
    }
    $scope.countries = data; 
  });
  
  // Get the paymentMethods
  $scope.paymentMethods = Api.PaymentMethods().query();

//  $scope.roles = Api.Roles().query();
/*
  // Watch the identifcation number field 
  $scope.$watch('member.identification', function(v, v_old) {
    if( typeof v == 'undefined' || v == null ) {
      return;
    }
    
    // Update the birthdate
    $scope.member.birthdate = [v.slice(0, 4), '-', v.slice(4, 6), '-', v.slice(6, 8)].join('');
  });
*/
  // Set the gender_id when gender is set
  $scope.$watch('member.paymethod', function(v, v_old) {
    if( typeof v == 'undefined' ) {
      return;
    }
    
    $scope.member.paymethod_id = $scope.paymethod.id;
  });
  
  // Save the member
  $scope.submit = function() {
    console.log($scope.member);
    if($scope.member.id) {
      $scope.member.$update();
    } else {
      Api.Members().save($scope.member);
    }
  };
  
}