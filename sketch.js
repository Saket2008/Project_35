var dog, dogImg, happyDog;
var database;
var foodS, foodStock;
var feed, add;
var feedTime, lastFed;
var foodObj;  
var bowls, bowlImg1, bowlImg2;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

  bowlImg1 = loadImage("images/DogBowl.png");
  bowlImg2 = loadImage("images/DogMilk.png");
}

function setup() {
	createCanvas(1000, 400);

  database = firebase.database();

  foodObj = new Food();
  
  //Display = 685, 312, 1365, 624;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200);
  dog.addImage(dogImg);
  dog.scale = 0.2


  feed = createButton("Feed Dog");
  feed.position(600, 120);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(700, 120);
  add.mousePressed(addFoods);

  bowls = createSprite(displayWidth/2, 250, 50, 50);
  bowls.addImage(bowlImg1);
  bowls.scale = 0.5;
}


function draw() 
{  
  background(46, 139, 87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill("yellow");
  textSize(25);

  if (lastFed >= 12)
  {
    text("Last feed: " + lastFed % 12 + " PM", 450, 30);
  }
  else if (lastFed === 0)
  {
    text("Last feed: 12 AM", 450, 30)
  }
  else
  {
    text("Last feed: " + lastFed + " AM", 450, 30)
  }
  
  drawSprites();
}

function readStock(data)
{
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog()
{  
  if(foodObj.getFoodStock()<= 0)
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    dog.addImage(happyDog);
    bowls.addImage(bowlImg2);
  }
  
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods()
{
  foodS++;

  database.ref('/').update({
    Food: foodS
  })
}