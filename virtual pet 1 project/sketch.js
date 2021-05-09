//Create variables here
var dog,happyDog,database,foodS,foodStock
var happyDogImage
var dogImage

function preload()
{
happyDogImage=loadImage("happydog.png")
 dogImage=loadImage("Dog.png")


}

function setup() {
  database=firebase.database()
	createCanvas(1000,400)
foodObj=new Food()


  dog=createSprite(250,250)

  dog.addImage(dogImage)
  dog.scale=0.1

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed= createButton("FeedDog")
  feed.position(200,200)
  feed.mousePressed(feedDog)

  add=createButton("Add more food")
  add.position(200,400)
  add.mousePressed(addFoods)
  
      
}


function draw() {  
  background("red")
  foodObj.display()
  fedTime=database.ref("FeedTime")
  fedTime.on("value",function(data){

lastFed=data.val()

  })
fill("black")
textSize(20)

  if(lastFed>=12){

text("Last Feed:"+ lastFed%12+"PM",350,30)

  }else
    if(lastFed==0){

      text("Last Feed:12AM ",350,30)
      
        }else{

          text("Last Feed:"+lastFed+"AM",350,30)
          
            }

  
     
  drawSprites();
  //add styles here
  


  textSize(20)
  text("Food:"+foodS,200,200)
  

}

function readStock(data){

foodS=data.val();

}
function feedDog(){
if(foodObj.getFoodStock()<0){

  foodObj.updateFoodStock(foodObj.getFoodStock()*0)
}


else{

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)


}
database.ref('/').update({

Food:foodObj.getFoodStock(),
FeedTime:hour()

})

}


 function addFoods(){
foodS++

database.ref('/').update({

Food:foodS

})
}