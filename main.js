

var pulpTTT = angular.module('pulpTTT', ['ngFx','firebase']);

pulpTTT.controller('gameCtrl', ['$scope','$firebase','$timeout', function($scope, $firebase, $timeout){

$scope.showCover = false;

$timeout(function(){
	$scope.showCover = true;
}, 500);

$scope.showGameBoard = false;

$timeout(function(){
	$scope.showGameBoard = true;
}, 1000);

$scope.showCoverTitle = false;
$timeout(function(){
	$scope.showCoverTitle = true;
}, 1000);

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

var box = {cells: ['','','','','','','','','']};

/*var ref = $firebase( new Firebase("https://pulpttt.firebaseio.com/data") );
ref.$bind($scope,'box');

$scope.$watch('box', function(){
	console.log('Hello!');
});*/

$scope.counter = 0
$scope.characterTurn = "Butch's";

$scope.gamePlay = function(value) {

	$scope.counter = $scope.counter + 1;
	console.log($scope.counter);
if ($scope.db.cells[value] == 0)	 
	if ($scope.counter % 2 == 0) {
		$scope.characterTurn = "Butch's";
		console.log(value);
		$scope.db.cells[value] = "X"
		console.log($scope.db.cells);
	} else {
		$scope.characterTurn = "Vincent's";
		console.log(value);
		$scope.db.cells[value] = "O"
		console.log($scope.db.cells);
	};
	$scope.trigger($scope.db.cells);
	$scope.winner($scope.db.cells);
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


var ref = $firebase(new Firebase('https://pulpttt.firebaseio.com/data'));

var syncObject = ref.$asObject();

syncObject.$bindTo($scope, "db").then(function() {
$scope.db = box;
});


}]);
