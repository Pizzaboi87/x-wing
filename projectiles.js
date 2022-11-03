export class MyLaser {
    constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 25;
        this.toDelete = false;
        this.sound = new Audio('./sounds/xwing_fire.mp3');
        this.soundOnce = true;
    }
    update(){
        this.y -= 10;
        if (this.soundOnce === true){
            this.sound.play();
            this.soundOnce = false;
        } 
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
        this.sound = new Audio('./sounds/tie-fighter_fire.mp3');
        this.sound2 = new Audio('./sounds/tie-fighter_fire2.mp3');
        this.soundOnce = true;
    }
    update(){
        this.y += 5;
        if (this.soundOnce === true){
            let random = Math.random();
            if (random > 0.5) this.sound.play();
        else this.sound2.play();
        this.soundOnce = false;
        } 
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
        this.sound = new Audio('./sounds/tie-bomber_fire.mp3');
        this.soundOnce = true;
    }
    update(){
        this.y += 3;
        if (this.soundOnce === true){
            this.sound.play();
            this.soundOnce = false;
        } 
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