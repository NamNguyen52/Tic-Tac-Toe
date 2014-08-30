

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

var box = {	cells: ['','','','','','','','',''],
			numberOfPlayers: 0,
			gameInProg: true,
			counter: 0,
			characterTurn: "Butch\’s",
			factShow: false,
			factCount: 0,
			factoidData: "",
			winnerTitle: false,
			winner: "",
			tie: "",
			tabCounter: 0,
			playAgainMenu: false
};

$scope.counter = 0
$scope.characterTurn = "Butch's";

$scope.gamePlay = function(value) {
	if($scope.player1 == "Butch" && $scope.db.characterTurn == "Vincent's") {
		alert("It's not your turn!");
		return false;
	};

	if($scope.player2 == "Vincent" && $scope.characterTurn == "Butch's" && $scope.db.counter == 0) {
		alert("It's not your turn!");
		return false;
	};

	if($scope.player2 == "Vincent" && $scope.db.characterTurn == "Butch's") {
		alert("It's not your turn!");
		return false;
	};

	$scope.db.counter = $scope.db.counter + 1;
	console.log($scope.db.counter);
if ($scope.db.cells[value] == 0)	 
	if ($scope.db.counter % 2 == 0) {
		$scope.db.characterTurn = "Butch's";
		console.log(value);
		$scope.db.cells[value] = "X"
		console.log($scope.db.cells);
	} else {
		$scope.db.characterTurn = "Vincent's";
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
			$scope.db.tabCounter+=1;
			$scope.tab+=1;
			if ($scope.db.tabCounter == 9) {
				$scope.db.winnerTitle = true;
				$scope.db.tie="It's a tie!";
				$scope.playAgain();
				return true
			} else {
				return false;
			}
		} else {
			return false;
		};
	};
};

$scope.winnerTitle = false;

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
		$scope.db.winnerTitle = true;
		$scope.db.winner="Vincent!";
		$scope.db.tabCounter = 0;
		$scope.playAgain();
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
		$scope.db.winnerTitle = true;
		$scope.db.winner="Butch!";
		$scope.db.tabCounter = 0;
		$scope.playAgain();
		return true;
	} else {
		return false;	
	};
};

$scope.playAgainMenu = false;
$scope.playAgain = function(){
	$timeout(function(){
		$scope.db.playAgainMenu = true;
	}, 1000);
};

//FACTOIDS
$scope.factCount = 0;
$scope.factShow = false;
$scope.pulpFacts = function() {
	$scope.db.factShow = true;
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
	$scope.db.factoidData = factArray[$scope.db.factCount];
	$scope.db.factCount += 1;
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

//GAME RESET
$scope.gameResetYes = function() {
    $scope.db.gameInProg = false;
    syncObject.$save().then(function(){
    	 syncObject.$destroy();
    	 window.location.reload();
    });
};


}]);
