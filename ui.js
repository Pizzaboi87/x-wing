export default class UI {
    constructor(game){
      this.game = game;
      this.score = 0;
      this.winScore = 50;
      this.message = '';
      this.escapeOut = false;
    }
    update(){
      if (this.game.player.lives <= 0){
        this.message = 'GAME OVER';
        this.game.gameOver = true;
      }
      if (this.score >= this.winScore){
        this.message = 'Mission Accomplished';
        this.game.gameOver = true;
      }
    }
    draw(context){
      context.fillStyle = 'gold';
      context.textAlign = 'left';
      context.font = '30px Helvetica';
      context.fillText('Score: ' + this.score, 20, 50);
      context.fillText('Lives', 20, 100);
      for (let i = 0; i < this.game.player.lives; i++){
        context.fillRect(100 + i * 15, 75, 15, 30);    
      }
      if (this.game.gameOver){
        context.fillStyle = 'gold';
        context.textAlign = 'center';
        context.fillText(this.message, this.game.width*0.5, this.game.height*0.5);
        this.escapeOut = true;
      }
    }
  }