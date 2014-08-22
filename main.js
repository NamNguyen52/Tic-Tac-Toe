var pulpTTT = angular.module('pulpTTT', []);

pulpTTT.controller('gameCtrl', ['$scope', function($scope){

//	$scope.player1 = "vincent";
//	$scope.player2 = "butch";


$scope.playerAsign = function(buttonNum) {
	
 	switch(buttonNum) {
 		case (buttonNum === 1):
 		$scope.player1 = buttonNum;
 		break;
 		case (buttonNum === 2):
 		$scope.player1 = buttonNum;
 		break;
 		default:
 		return false;
 	};
 	console.log($scope.player1);

 	switch($scope.player1) {
 		case ($scope.player1 === 1):
 		$scope.player2 = 2;
 		break;
 		case ($scope.player1 === 2):
 		$scope.player2 = 1;
 		break;
 		default:
 		return false;
 	};
 	console.log($scope.player2);
};

}]);