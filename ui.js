export default class UI {
    constructor(game){
        this.game = game;
        this.score = 0;
        this.winScore = 200;
        this.message = '';
        this.escapeOut = false;
        this.instructions = true;
        this.instructionsText1 = "Reach out minimum " + this.winScore + " points to WIN!"
        this.instructionsText2 = "Move with Arrow Keys, shoot with CTRL"
        this.instructionsText3 = "When the game ends, press Space to start again!"
        this.instructionsText4 = "Have fun and may the Force be with You!"
        this.instructionsText5 = "(Press Enter to hide this message)"
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
        context.font = '30px Orbitron';
        context.fillText('Score: ' + this.score, 20, 50);
        context.fillText('Lives', 20, 100);
        for (let i = 0; i < this.game.player.lives; i++){
            context.fillRect(130 + i * 15, 75, 15, 30);    
        }
        if (this.game.gameOver){
            context.fillStyle = 'gold';
            context.textAlign = 'center';
            context.fillText(this.message, this.game.width*0.5, this.game.height*0.5);
            this.escapeOut = true;
        }
        if (this.instructions) {
            context.font = '20px Orbitron';
            context.textAlign = 'center';
            context.fillText(this.instructionsText1, this.game.width*0.5, this.game.height*0.8);
            context.fillText(this.instructionsText2, this.game.width*0.5, this.game.height*0.8 + 25);
            context.fillText(this.instructionsText3, this.game.width*0.5, this.game.height*0.8 + 50);
            context.fillText(this.instructionsText4, this.game.width*0.5, this.game.height*0.8 + 75);
            context.fillText(this.instructionsText5, this.game.width*0.5, this.game.height*0.8 + 100);
        }
    }
}