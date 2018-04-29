
// -- user code here --
var angle={max:0};
var step=180;
var currentAngle=0;
var graphics;
var radious=200;
var width=10
var timer;
var generatedGraphics;
var genetatedRadious=0;
var isGameOver=false;
var scoreLabel;
var generatedAngle=0;
var segment=function(segments,radious,width){
	this.segments=segments;
	this.colors=[0xffd900,0xff0000];
	this.radious=radious;
	this.gap=1;
	this.width=width;
	this.create=function(graphics,game){
		   var step=360/this.segments;
		   var angle=0;
		   this.graphics=graphics;
		   this.game=game;
			for(i=0;i<this.segments;i++){
				  graphics.lineStyle(this.width, this.colors[i]);
				  graphics.arc(0, 0, this.radious,game.math.degToRad(angle-this.gap),  game.math.degToRad(angle+step-this.gap), false);
				  angle+=step;
			}	
		   
		};
		this.refresh=function(){
		 this.graphics.clear();
		 var step=360/this.segments;
		   var angle=0;
			for(i=0;i<this.segments;i++){
				  this.graphics.lineStyle(this.width, this.colors[i]);
				  this.graphics.arc(0, 0, this.radious,this.game.math.degToRad(angle-this.gap),  this.game.math.degToRad(angle+step-this.gap), false);
				  angle+=step;
			}	
	 };
	 this.setRadious=function(radious){
		 this.radious=radious;
		 this.refresh();
	 };
	 this.setWidth=function(width){
		 this.width=width;
		 this.refresh();
	 }
}
var seg1=new segment(2,radious,width);
var seg2=new segment(2,0,10);
/* --- start generated code --- */

// Generated by  1.5.0 (Phaser v2.6.2)


/**
 * Level.
 */
function Level() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

Level.prototype.init = function () {
	
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	
};

Level.prototype.preload = function () {
	
	this.load.pack('images', 'assets/pack.json');
	
};

Level.prototype.create = function () {
	scoreLabel=this.add.text(458.0, 42.0, '0', {"font":"bold 50px Arial","fill":"#ffffff"});
	
	var _Right = this.add.button(491.0, 904.0, 'Right', right, this, null, null, null, null);
	_Right.scale.setTo(0.3, 0.3);
	
	var _Left = this.add.button(148.0, 904.0, 'Right', left, this, null, null, null, null);
	_Left.scale.setTo(-0.3, 0.3);
	
	
	timer=this.time.create(false);
		timer.loop(3000, generator, this);
		timer.start();
		
		
		generatedGraphics= this.add.graphics(this.world.centerX, this.world.centerY);
		
	    //  Our first arc will be a line only
		// generatedGraphics.lineStyle(30, 0xffd900);
			
		    // graphics.arc(0, 0, 135, game.math.degToRad(0), game.math.degToRad(90), false);
		// generatedGraphics.arc(0, 0, genetatedRadious,this.math.degToRad(2),  this.math.degToRad(178), false);
		 
		 graphics = this.add.graphics(this.world.centerX, this.world.centerY);
		
			    //  Our first arc will be a line only
	//		    graphics.lineStyle(30, 0xffd900);
	//			
	//		    // graphics.arc(0, 0, 135, game.math.degToRad(0), game.math.degToRad(90), false);
	//		    graphics.arc(0, 0, 135,this.math.degToRad(2),  this.math.degToRad(178), false);
	//		    graphics.lineStyle(30, 0xff0000);
	//		    graphics.arc(0, 0, 135,this.math.degToRad(182),  this.math.degToRad(358), false);
			    //  As we wish to draw a 2nd arc on the SAME Graphics object, we need to move the drawing operation
			    // graphics.moveTo(-100, -100);
			   
			    
		seg1.create(graphics,this);
		seg2.create(generatedGraphics,this);
		width=10;
		radious=200;
		score=0;
		isGameOver=false;
	
};

/* --- end generated code --- */
// -- user code here --

function left(){
	if(isGameOver)
		return;
	currentAngle-=step;
	this.add.tween(angle).to({max:currentAngle},400,"Linear",true,0,0,false); 
  //console.log("Left clicked");
}
function right(){
	if(isGameOver)
		return;
	currentAngle+=step;
	this.add.tween(angle).to({max:currentAngle},400,"Linear",true,0,0,false); 
	// console.log("Right clicked");
}
var generated=false;
function generator(){
	 console.log("generator 1");
	if(generated||isGameOver)
		return;
	
	// console.log("generator 2");
	 var angleFactor=this.rnd.integerInRange(0, 360)%step;	
	 generatedAngle=angleFactor*step;
	 generatedGraphics.angle=generatedAngle;
	generated=true;
	
}

function replay(){
	
}
function isMatched(generatedAngle,userAngle,segmentAngle){
	var number1=((360+generatedAngle)%360)/segmentAngle;
	var number2=((360+userAngle)%360)/segmentAngle;
//	console.log("number1 "+number1+" generatedAngle "+generatedAngle+" userAngle "+userAngle+" segmentAngle "+segmentAngle+" number2 "+number2);
	return number1==number2;
}
Level.prototype.update=function(){
	//if(angle.max<=180){
		graphics.angle=angle.max;
	//}
	if(generated){
		genetatedRadious+=4;
		seg2.setRadious(genetatedRadious);
		if(genetatedRadious>=radious){
			//radious-=5;
			
			if(isMatched(generatedAngle, currentAngle, step))
				{
					score+=1;
					scoreLabel.text=score;
					//width+=10;
					seg1.setWidth(width);
				}
			else
				{
				    this.state.start("GameOver");
				    message="Game Over";
					isGameOver=true;
				}
			genetatedRadious=0;
			generated=false;
		}
	}
}
