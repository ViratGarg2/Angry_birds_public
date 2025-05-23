const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;
var birds = [];
var turns = 3;
var display = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
        text("Turns:"+ turns,300,50)
        if(display == 1){
            textSize(50);
            text("No Turns left",width/2-150,height/2);
        }
        if(score>=400){
            textSize(50);
            display = 2;
            text("You Won !!",width/2-150,height/2);
        }
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();
    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();
    box5.display();
    log4.display();
    log5.display();
    bird.display();
    platform.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched" && turns>0 && display == 0){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }

}


function mouseReleased(){
    if(turns>0 && display == 0){
    slingshot.fly();
    gameState = "launched";
    if(turns>0){
    turns--;
    }
}
}

function keyPressed(){
    if(keyCode === 32 && display == 0){
    Matter.Body.setPosition(bird.body,{x : 200,y : 50 })
       slingshot.attach(bird.body);
       gameState = "onSling"
    }
    if(turns == 0 && score<400){
        display = 1;
    }
}

async function getBackgroundImg(){
    // var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    // var responseJSON = await response.json();

    // var datetime = responseJSON.datetime;
    // console.log(datetime)
    var hour = 7;
    
    if(hour>=6 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}