 var pulpTTT = angular.module('pulpTTT', ['firebase']);

pulpTTT.controller('gameCtrl', ['$scope','$firebase', function($scope, $firebase, $ngAudio){


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

$scope.box = {cells: ['','','','','','','','','']};

var ref = $firebase( new Firebase("https://pulpttt.firebaseio.com/data") );
ref.$bind($scope,'box');

$scope.$watch('box', function(){
	console.log('Hello!');
});

$scope.counter = 0

$scope.gamePlay = function(value) {

	$scope.counter = $scope.counter + 1;
	console.log($scope.counter);
if ($scope.box.cells[value] == 0)	 
	if ($scope.counter % 2 == 0) {
		console.log("1");
		console.log(value);
		$scope.box.cells[value] = "X"
		console.log($scope.box.cells);
	} else {
		console.log("2");
		console.log(value);
		$scope.box.cells[value] = "O"
		console.log($scope.box.cells);
	};
	$scope.trigger($scope.box.cells);
	$scope.winner($scope.box.cells);
};

$scope.tab = 0
$scope.tabCounter = 0

$scope.trigger = function(array) {

	while ($scope.tab < array.length+1) {
		if (array[$scope.tab] == "X" || "O") {
			$scope.tabCounter+=1;
			$scope.tab+=1;
			if ($scope.tabCounter == 9) {
				$scope.tie="It's a tie!";
				return true
			} else {
				return false;
			}
		} else {
			return false;
		};
	};
};

$scope.winner = function(array2) {

	if ( 

		 array2[0] == 'X' && array2[1] == 'X' && array2[2] == 'X' ||
	     array2[3] == 'X' && array2[4] == 'X' && array2[5] == 'X' ||
	     array2[6] == 'X' && array2[7] == 'X' && array2[8] == 'X' ||
	     array2[0] == 'X' && array2[4] == 'X' && array2[8] == 'X' ||
	     array2[2] == 'X' && array2[4] == 'X' && array2[6] == 'X' ||
	     array2[0] == 'X' && array2[3] == 'X' && array2[6] == 'X' ||
	     array2[1] == 'X' && array2[4] == 'X' && array2[7] == 'X' ||
	     array2[2] == 'X' && array2[5] == 'X' && array2[8] == 'X'
	 	
		 ){
		$scope.winner="Vincent!";
		$scope.tabCounter = 0;
		return true;
	} else if (

		 array2[0] == 'O' && array2[1] == 'O' && array2[2] == 'O' ||
	     array2[3] == 'O' && array2[4] == 'O' && array2[5] == 'O' ||
	     array2[6] == 'O' && array2[7] == 'O' && array2[8] == 'O' ||
	     array2[0] == 'O' && array2[4] == 'O' && array2[8] == 'O' ||
	     array2[2] == 'O' && array2[4] == 'O' && array2[6] == 'O' ||
	     array2[0] == 'O' && array2[3] == 'O' && array2[6] == 'O' ||
	     array2[1] == 'O' && array2[4] == 'O' && array2[7] == 'O' ||
	     array2[2] == 'O' && array2[5] == 'O' && array2[8] == 'O'

		) {
		$scope.winner="Butch!";
		$scope.tabCounter = 0;
		return true;
	} else {
		return false;	
	};
};


}]);

