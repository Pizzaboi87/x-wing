export default class Explosion {
    constructor(game, enemy){
        this.game = game;
        this.enemy = enemy;
        this.width = 192;
        this.height = 192;
        this.x = enemy.x - enemy.width * 0.5;
        this.y = enemy.y - enemy.height * 0.4;
        this.image = document.getElementById('explosion');
        this.frameX = 0;
        this.maxFrame = 4;
        this.toDelete = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    update(deltaTime){
        if (this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX > this.maxFrame) this.toDelete = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}