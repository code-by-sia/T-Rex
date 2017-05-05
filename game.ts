enum DrawAnchor {
  TopLeft,TopCenter,TopRight,
  MiddleLeft,MiddleCenter,MiddleRight,
  BottomLeft,BottomCenter,BottomRight
}

class ImageCollection {
  private imgs=[];
  public anchor:DrawAnchor=DrawAnchor.TopLeft;

  constructor(...images){
    for(var i=0;i<images.length;i++){
      this.imgs[i] = new Image();
      this.imgs[i].src = images[i];
    }
  }

  getCount(){
    return this.imgs.length;
  }

  getHeight(index){
    return this.imgs[index].height;
  }

  getWidth(index){
    return this.imgs[index].width;
  }

  draw(ctx,index,x,y){
    var img = this.imgs[index];
    if(img){
      switch(this.anchor){
        case DrawAnchor.MiddleLeft:
        case DrawAnchor.MiddleCenter:
        case DrawAnchor.MiddleRight:
          y -= img.height/2;
          break;
        case DrawAnchor.BottomLeft:
        case DrawAnchor.BottomCenter:
        case DrawAnchor.BottomRight:
         y -= img.height;
         break;
      }
      switch(this.anchor){
        case DrawAnchor.TopCenter:
        case DrawAnchor.MiddleCenter:
        case DrawAnchor.BottomCenter:
          x -= img.width /2;
          break;
        case DrawAnchor.TopRight:
        case DrawAnchor.MiddleRight:
        case DrawAnchor.BottomRight:
          x -= img.width;
      }

      ctx.drawImage(img,x,y);
    }
  }

}

class AnimatedImage extends ImageCollection{
  private frame=0;
  private current=0;
  public framesToChange=1;

  constructor(...images){
    super(...images);
  }

  reset(){
    this.frame=0;
  }

  draw(ctx,x,y){
    super.draw(ctx,this.current,x,y);
    if(this.frame % this.framesToChange == 0){
      this.current =(1+ this.current) % super.getCount();
    }
    this.frame = this.frame + 1 ;
  }

  getCurrentHeight(){
    return super.getHeight(this.current);
  }

  getCurrentWidth(){
    return super.getWidth(this.current);
  }

}


class Plant {
  public position=0;
  public height=0;
  public width=0;

  constructor(public index){

  }


}

class Game {

  private canvas;
  private timerId;
  private frame=0;
  private width=0;
  private height=0;
  private mid=0;
  private trexAnimation;
  private plantImages;
  private jumping = false;
  private jumpingState = 1;
  private plants:Plant[] =[];
  private tRexTop =0;
  private tRexLeft=0;
  private score=0;
  private gameOver=false;

  constructor(private container){
    this.init();
  }

  private init(){
   this.canvas  = document.createElement('canvas');
   this.container.appendChild(this.canvas);
   this.width = this.canvas.width = this.container.clientWidth;
   this.height = this.canvas.height = this.container.clientHeight;
   this.mid = this.height / 2;

   this.trexAnimation = new AnimatedImage(
    'img/1.png',
    'img/2.png',
    'img/3.png',
    'img/4.png',
    'img/5.png',
   );
   this.trexAnimation.anchor=DrawAnchor.BottomLeft;

   this.plantImages = new ImageCollection(
    'img/plant-1.png',
    'img/plant-2.png',
    'img/plant-3.png',
    'img/plant-4.png',
   );
   this.plantImages.anchor=DrawAnchor.BottomLeft;

   this.trexAnimation.framesToChange = 3;
  }

  isStopped(){
    return this.gameOver;
  }

  private addRandomPlant(){
    if(Math.random() > .3 && this.plants.length < 3){
      var index = Math.floor(Math.random() * this.plantImages.getCount());
      var plant = new Plant(index);
      plant.position = this.width;
      plant.height = this.plantImages.getHeight(index);
      plant.width = this.plantImages.getWidth(index);
      this.plants.push(plant);
    }
  }

  private nextFrame(){
    this.frame= 1+this.frame % 100;
    if(this.frame % 50==0){
      this.addRandomPlant();
    }
    this.score+=1;
    this.render();
  }

  private clearCanvas(){
    this.canvas.width = this.canvas.width;
  }

  private render(){
    this.clearCanvas();
    var ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#555';
    this.drawPlants(ctx);
    this.drawTRex(ctx);
    this.drawScore(ctx);

    if(this.gameOver){
      ctx.fillStyle='red';
      ctx.textAlign='center';
      ctx.font='48px arial';
      ctx.fillText('GAME OVER!',this.width/2,this.mid-35);
    }

  }

  private drawScore(ctx){
    ctx.font='20px Arial';
    ctx.fillText(`Score: ${this.score}`,50,50);
  }


  private isHitted(plant){
    var delta = 20;
    var trexW = this.trexAnimation.getCurrentWidth()-2*delta;
    var trexH = this.trexAnimation.getCurrentHeight()-2*delta;
    var trexX = this.tRexLeft + delta;
    var trexY = this.tRexTop - trexH - delta;
    var trexX2= trexX + trexW;
    var trexY2= trexY + trexH;


    var plantW = plant.width - 2*delta;
    var plantH = plant.height - 2*delta;
    var plantX = plant.position + delta;
    var plantY = this.mid - plantH - delta;
    var plantX2= plantX + plantW;
    var plantY2= plantY + plantH;

    var between = (n,min,max)=>  (n >= min) && (n <=max);

    return  (between(plantX,trexX,trexX2) && between(plantY,trexY,trexY2)) ||
            (between(plantX2,trexX,trexX2) && between(plantY2,trexY,trexY2)) ;

  }

  private drawPlants(ctx){
    var y= this.mid;
    for(var i=0;i<this.plants.length;i++){
      var plant = this.plants[i];
      plant.position -= 10 + (this.score/100);
      this.plantImages.draw(ctx,plant.index,plant.position,y);

      if(this.isHitted(plant))
      {
        this.gameOver=true;
        this.stop();
      }

      if(plant.position < 0){
        this.plants.splice(i,1);
      }
    }
  }

  private drawTRex(ctx){
    var trexY = this.mid;
    if(this.jumping){
     trexY = trexY - Math.sin(Math.PI *this.jumpingState/25)*200;
     this.jumpingState = this.jumpingState + 1;
     if(this.jumpingState > 25){
      this.jumping=false;
     }
    }

    this.tRexTop = trexY;
    this.tRexLeft = 100;

    ctx.strokeRect(0,this.mid,this.width,1);
    this.trexAnimation.draw(ctx,this.tRexLeft,this.tRexTop);

  }

  play(){
    this.timerId= setInterval(_=>this.nextFrame(),50);
  }

  stop(){
    clearInterval(this.timerId);
  }

  restart(){
    this.gameOver = false;
    this.plants=[];
    this.score = 0;
    this.play();
  }

  jump(){
    if(this.jumping){
      return;
    }

    this.jumping=true;
    this.jumpingState = 1;
  }

}

var el = document.getElementById('screen');
var game = new Game(el);
game.play();

const jumpOrResume = ()=>{
  if(game.isStopped()){
    game.restart();
    return;
  }
  game.jump();
};


window.addEventListener('click',event=>{
  jumpOrResume();
  return false;
});

window.addEventListener('touchstart',event=>{
  jumpOrResume();
  return false;
});

window.addEventListener('keypress',event=>{
  if(event.key === " "){
    jumpOrResume();
    return false;
  }
});
