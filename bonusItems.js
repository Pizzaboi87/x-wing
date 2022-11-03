export class BounusItem {
    constructor(game){
        this.game = game;
        this.x = Math.random() * (this.game.width * 0.95 - 50);
        this.y = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.toDelete = false;
        this.timer = 0;
        this.fps = 5;
        this.interval = 1000/this.fps;
    }
    update(deltaTime){
        this.handleFrame(deltaTime);
        if (this.y > this.game.height) this.toDelete = true;
    }
    handleFrame(deltaTime){
        if (this.timer > this.interval){
          this.timer = 0;
          if (this.frameX < this.maxFrame){
            this.frameX++;
          } else {
            this.frameX = 0;
          }
        } else this.timer += deltaTime;
    }
}

export class BonusLife extends BounusItem {
    constructor(game){
        super(game);
        this.width = 49;
        this.height = 50;
        this.maxFrame = 4;
        this.image = document.getElementById('rebel-logo');
        this.sound = new Audio('./sounds/earn-bonus.mp3');
    }
    update(deltaTime){
        this.y++;
        this.handleFrame(deltaTime);
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}