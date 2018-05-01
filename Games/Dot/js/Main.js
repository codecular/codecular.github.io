window.onload = function() {
	var game = new Phaser.Game(576, 1024, Phaser.AUTO);

	// Add the States your game has.
	// game.state.add("Boot", Boot);
	// game.state.add("Menu", Menu);
	// game.state.add("Preload", Preload);
	
	game.state.add("GameOver", GameOver);	
	game.state.add("Level", Level);	
	game.state.start("Level");
	
};

var score=0;
var bestScore=0;
var message="";
