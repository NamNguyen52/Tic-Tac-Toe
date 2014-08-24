var pulpTTT = angular.module('pulpTTT', []);

pulpTTT.controller('gameCtrl', ['$scope', function($scope){


$scope.playerAsign = function(buttonNum) {

	if (buttonNum == 1) {
		$scope.player1 = "Vincent";
	} else {
		$scope.player1 = "Butch";
	}

	if ($scope.player1 == "Vincent") {
		$scope.player2 = "Butch";
	} else {
		$scope.player2 = "Vincent";
	}
	$scope.playerOrder.push($scope.player1);
	$scope.playerOrder.push($scope.player2);
}

$scope.playerOrder = [];

$scope.cells = ['','','','','','','','',''];

$scope.counter = 0

$scope.gamePlay = function(value) {

	$scope.counter = $scope.counter + 1;
	console.log($scope.counter); 
	if ($scope.counter % 2 == 0) {
		console.log("1");
		console.log(value);
		$scope.cells[value] = "X"
		console.log($scope.cells);
	} else {
		console.log("2");
		console.log(value);
		$scope.cells[value] = "O"
		console.log($scope.cells);
	};
	$scope.trigger($scope.cells);
};

$scope.tab = 0
$scope.tabCounter = 0

$scope.trigger = function(array) {

	while ($scope.tab < array.length+1) {
		if (array[$scope.tab] == "X" || "O") {
			$scope.tabCounter+=1;
			$scope.tab+=1;
			if ($scope.tabCounter == 9) {
				$scope.winner(array);
			} else {
				return false;
			}
		} else {
			$scope.tab+=1;
		};
	};
};

$scope.winner = function(array2) {

	if ( 

		 array2[0] == 'X' && array2[1] == 'X' && array2[2] == 'X' ||
	     array2[3] == 'X' && array2[4] == 'X' && array2[5] == 'X' ||
	     array2[6] == 'X' && array2[7] == 'X' && array2[8] == 'X' ||
	     array2[0] == 'X' && array2[4] == 'X' && array2[8] == 'X' ||
	     array2[0] == 'X' && array2[3] == 'X' && array2[6] == 'X' ||
	     array2[1] == 'X' && array2[4] == 'X' && array2[7] == 'X' ||
	     array2[2] == 'X' && array2[5] == 'X' && array2[8] == 'X'
	 	
		 ){
		alert("Vincent wins!");
	} else {
		alert("Butch wins!");
	};
};	


}]);

