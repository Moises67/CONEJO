const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;

function preload(){
  conejoNormalANI = loadAnimation("./RECURSOS/blink_1.png","./RECURSOS/blink_2.png","./RECURSOS/blink_3.png");
  conejoTristeANI = loadAnimation("./RECURSOS/sad_1.png","./RECURSOS/sad_2.png");
  conejoComiendoANI = loadAnimation("./RECURSOS/eat_0.png", "./RECURSOS/eat_1.png","./RECURSOS/eat_2.png", "./RECURSOS/eat_3.png", "./RECURSOS/eat_4.png" );
  backGround = loadImage("./RECURSOS/background.png");
  fruitIMG = loadImage("./RECURSOS/melon.png");
  windSonido = loadSound("./RECURSOS/sound_air.wav");
  ropeCutterSonido = loadSound("./RECURSOS/rope_cut.mp3");
  eatingSonido = loadSound("./RECURSOS/sound_eating.mp3");
  sadSonido = loadSound("./RECURSOS/sound_sad.wav");
  backgroundSonido = loadSound("./RECURSOS/sound_background.mp3");
}
function setup() 
{
  createCanvas(windowWidth,windowHeight);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2, height-10, width, 20);
  rope = new Rope(5, {x:width/2, y:100});
  fruit = new Fruit(300, 300, 15);  
  fruitlink = new Link(rope.getLast(), fruit.body);
  fruitlink2 = new Link(rope.getLast(), fruit.body);
  boton=createImg("./RECURSOS/cut_button.png");
  boton.position(width/2-20,100);
  boton.size(50,50);
  boton.mouseClicked(drop);
  SONIDO=createImg("./RECURSOS/sound.png");
  SONIDO.position(width/16,height*0.05);
  SONIDO.size(50,50);
  SONIDO.mouseClicked(sonido);
  botonGlobo=createImg("./RECURSOS/balloon.png");
  botonGlobo.position(50, 350);
  botonGlobo.size(50,50);
  botonGlobo.mouseClicked(soplar);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  var celular=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var computador=/iOS|Mac|Windows|Chrome/i.test(navigator.userAgent);
  // if(celular){
  //   conejo = createSprite(width/2, height*0.90);
  //   conejo.addAnimation("normal",conejoNormalANI);
  //   conejo.addAnimation("triste",conejoTristeANI);
  //   conejo.addAnimation("comiendo",conejoComiendoANI);
  //   conejo.scale = 0.15;
  //   conejo.animation.frameDelay=8;
  // }
    conejo = createSprite(width/2, height*0.90);
    conejo.addAnimation("normal",conejoNormalANI);
    conejo.addAnimation("triste",conejoTristeANI);
    conejo.addAnimation("comiendo",conejoComiendoANI);
    conejo.scale = 0.15;
    conejo.animation.frameDelay=8;

}

function draw()
{
  background(51);
  image(backGround,0,0,width,height);
  ground.show();
  drawSprites();
  if(fruit != null && fruit.body.position.y >= ground.body.position.y-40){
    conejo.changeAnimation("triste");
  }
  if(fruit != null && collide(fruit.body.position, conejo.position)){
    conejo.changeAnimation("comiendo");
    conejo.animation.looping=false;
    fruit = null;
    eatingSonido.play();
  }
  Engine.update(engine);
  rope.show();
  if(fruit != null){
  fruit.show();}
}

function drop(){
  rope.break();
  fruitlink.broke();
  fruitlink = null;
  ropeCutterSonido.play();
}

function soplar(){
  Body.applyForce(fruit.body, {x: fruit.body.position.x, y: fruit.body.position.y}, {x:0.05, y:0});
  windSonido.play();
}

function collide(s1, s2){
  let distancia = dist(s1.x, s1.y, s2.x, s2.y);
  if(distancia <= 50){
    return true;
  }
  else{
    return false;
  }
}

function sonido(){
  if(backgroundSonido.isPlaying()){
    backgroundSonido.stop();
    SONIDO.attribute("src","./RECURSOS/sound.png");
  }
  else{
    backgroundSonido.play();
    SONIDO.attribute("src","./RECURSOS/mute.png");
  }
}