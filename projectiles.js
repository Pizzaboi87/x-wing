export class MyLaser {
    constructor(game, x, y){
      this.game = game;
      this.x = x;
      this.y = y;
      this.width = 3;
      this.height = 25;
      this.toDelete = false;
    }
    update(){
      this.y -= 10;
      if (this.y < -this.height) this.toDelete = true;
    }
    draw(context){
      context.save();
      context.shadowColor = "white";
      context.shadowBlur = 3;
      context.fillStyle = 'red';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.restore();
    }
  }
  
  export class EnemyLaser extends MyLaser {
    constructor(game, x, y){
      super(game, x, y);
    }
    update(){
      this.y += 5;
      if (this.y > this.game.height - this.height) this.toDelete = true;
    }
    draw(context){
      context.save();
      context.shadowColor = "white";
      context.shadowBlur = 2;
      context.fillStyle = 'green';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.restore();
    }
  }
  
  export class EnemyBomb extends MyLaser{
    constructor(game, x, y){
      super(game, x, y);
        this.round = 7;
    }
    update(){
      this.y += 3;
      if (this.y > this.game.height - this.height) this.toDelete = true;
    }
    draw(context){
      context.save();
      context.strokeRect(this.x - this.round, this.y - this.round, this.round, this.round)
      context.fillStyle = 'white';
      context.beginPath();
      context.arc(this.x, this.y, this.round, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.restore();
    }
  }