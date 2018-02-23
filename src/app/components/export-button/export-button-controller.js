export default function ExportButtonCtrl($scope, $state, sweet, Api) {
  $scope.exportInfo = function () {
    sweet.show({
      title: 'Exportera',
      text: 'Detta kommando exporterar den vy som du för närvarande tittar på, dvs det går bra att använda vyns filter för att begränsa exportdatan.',
      html: true,
      type: 'info',
    });
  };
}
