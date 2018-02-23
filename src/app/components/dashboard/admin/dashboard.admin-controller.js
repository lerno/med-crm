export default function DashboardAdminCtrl($scope, Api, principal, members, payments) {
  $scope.totalMembers = members.headers['x-total-count'];
}
