

var pulpTTT = angular.module('pulpTTT', ['ngFx','firebase']);

pulpTTT.controller('gameCtrl', ['$scope','$firebase','$timeout', function($scope, $firebase, $timeout){

$scope.showCover = false;

$timeout(function(){
	$scope.showCover = true;
}, 800);

$scope.showGameBoard = false;

$timeout(function(){
	$scope.showGameBoard = true;
}, 1000);

$scope.showCoverTitle = false;
$timeout(function(){
	$scope.showCoverTitle = true;
}, 1000);

/*$scope.playerAsign = function(buttonNum) {

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
}*/

$scope.playerOrder = [];

var box = {	cells: ['','','','','','','','',''],
			numberOfPlayers: 0,
			gameInProg: true,
			counter: 0
};

$scope.counter = 0
$scope.characterTurn = "Butch's";

$scope.gamePlay = function(value) {

	$scope.db.counter = $scope.db.counter + 1;
	console.log($scope.db.counter);
if ($scope.db.cells[value] == 0)	 
	if ($scope.db.counter % 2 == 0) {
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
	$scope.pulpFacts();
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
//FACTOIDS
$scope.factCount = 0;
$scope.factShow = false;
$scope.pulpFacts = function() {
	$scope.factShow = true;
	var factArray = [
	"Whenever Vincent Vega goes to the toilet (which is a lot - constipation is a side effect of heroin), something bad happens. He emerges at Mia Wallace's house to find her overdosing, comes out at the restaurant to find a robbery unfolding and is shot dead by Butch after using his bathroom.",
	"When Bruce Willis escapes the pawn shop, he sees a neon sign that says Killians Red, but as some of the letters are missing it reads 'Kill ed'. Picking up Zed's keys, Butch looks at the 'Z' on the keyring, subliminally spelling out 'Kill Zed'. It's then that Butch goes back to save Marcellus.",
	"The role of Vincent Vega was originally written for Michael Madsen, who played Vic Vega in Reservoir Dogs. Instead, Madsen opted to play Virgil Earp in Wyatt Earp. Tarantino then made the controversial choice of casting John Travolta, an actor best known for roles in Grease, Saturday Night Fever and Look Who's Talking. Travolta was paid less than $150,000, but went on to receive an Oscar nomination for Best Actor.",
	"Quentin Tarantino hesitated over playing Jimmie or Lance. He eventually chose Jimmie as he wanted to be behind the camera during Mia's overdose scene.",
	"The 'F word' is said 265 times during Pulp Fiction.",
	"Jules was originally meant to have a massive afro, but a crew member purchased a 'jheri curl' wig instead. Luckily, both Jackson and Tarantino liked it, and it became part of the character.",
	"The film's title is self-referential. 'Pulp' magazines were popular during the mid-20th century and famed for their graphic violence and punchy dialogue - exploited to attract a readership. The film's content mirrors these overt, unapologetic stylings.",
	"Butch’s Honda Civic is exact same one used in both Jackie Brown and Kill Bill: Volume 2.",
	"The shot of Marcellus stopping and seeing Butch in the middle of the road is copied directly from Psycho."
	];
	console.log(factArray[$scope.factCount]);
	$scope.factoidData = factArray[$scope.factCount];
	$scope.factCount += 1;
};

//FIREBASE

var ref = $firebase(new Firebase('https://pulpttt.firebaseio.com/data'));

var syncObject = ref.$asObject();

syncObject.$bindTo($scope, "db").then(function() {
	if (!$scope.db.gameInProg) {
		$scope.db = box;
	};

	$scope.localPlayerCharacter = $scope.db.numberOfPlayers;

	if ($scope.db.numberOfPlayers == 0) {
		$scope.player1 = "Butch";
		console.log($scope.player1);
	};

	if ($scope.db.numberOfPlayers == 1) {
		$scope.player2 = "Vincent";
		console.log($scope.player2);
	};
	$scope.db.numberOfPlayers += 1;
});


}]);
