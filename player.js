import { MyLaser } from "./projectiles.js";

export default class Player {
    constructor(game){
      this.game = game;
      this.x = this.game.width * 0.5 - 50;
      this.y = this.game.height;
      this.frameX = 2;
      this.frameY = 5;
      this.maxFrame = 4;
      this.height = 77;
      this.width = 117;
      this.speed = 10;
      this.myLasers = [];
      this.lives = 10;
      this.image = document.getElementById('x-wing');
      this.timer = 0;
      this.fps = 5;
      this.interval = 1000/this.fps;
    }
    update(deltaTime){
      // controls
      if (this.game.keys.includes('ArrowRight')) this.x += this.speed;
      if (this.game.keys.includes('ArrowLeft')) this.x -= this.speed;
      if (this.game.keys.includes('ArrowUp')) this.y -= this.speed;
      if (this.game.keys.includes('ArrowDown')) this.y += this.speed;
      // boundaries
      if (this.y < 0) this.y = 0;
      if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
      if (this.x < 0) this.x = 0;
      if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
      // lasers
      this.myLasers.forEach(laser => laser.update());
      this.myLasers = this.myLasers.filter(laser => !laser.toDelete);
      // sprite animation
      if (this.timer > this.interval){
        this.timer = 0;
        if (this.frameX < this.maxFrame){
            this.frameX++;
        } else {
            this.frameX = 0;
          }
      } else this.timer += deltaTime;
    }
    draw(context){
      context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 1.1, this.height * 1.1);
      this.myLasers.forEach(laser => laser.draw(context));
    }
    shoot(){
      this.myLasers.push(new MyLaser(this.game, this.x + 16, this.y - 2));
      this.myLasers.push(new MyLaser(this.game, this.x + this.width - 10, this.y - 2));
    }
  }