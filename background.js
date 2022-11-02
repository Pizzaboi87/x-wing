export default class Background {
    constructor(game){
      this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width;
        this.height = this.game.height;
        this.layer1 = document.getElementById('layer1');
    }
    update(){
      this.y += 2;
      if (this.y > this.game.height) this.y = 0;
    }
    draw(context){
      context.save();
      context.globalAlpha = 0.9;
      context.drawImage(this.layer1, this.x, this.y, this.width, this.height);
      context.drawImage(this.layer1, this.x, this.y - this.height, this.width, this.height);
      context.restore();
    }
  }