import { EnemyBomb, EnemyLaser } from "./projectiles.js";

export class Enemy {
    constructor(game){
        this.game = game;
        this.frameX = 0;
        this.toDelete = false;
        this.shootTime = 0;
        this.enemyLasers = [];
        this.enemyBombs = [];
        this.maxFrame = 4;
        this.timer = 0;
        this.fps = 5;
        this.interval = 1000/this.fps;
    }
    update(deltaTime){
        if (this.y > this.game.height - this.height || this.x > this.game.width - this.width) this.toDelete = true;
        this.handleFrame(deltaTime);
    }
    handleFrame(deltaTime){
        if (this.timer > this.interval){
            this.timer = 0;
            if (this.frameX < this.maxFrame){
            this.frameX++;
            } else this.frameX = 0;
        } else this.timer += deltaTime;
    }
    laserCounter(deltaTime){
        if (this.shootTime > this.shootIntense){
            this.shootEnemy();
            this.shootTime = 0;
        } else this.shootTime += deltaTime;
    }
    bombCounter(deltaTime){
        if (this.shootTime > this.shootIntense){
            this.bombEnemy();
            this.shootTime = 0;
        } else this.shootTime += deltaTime;
    }
}

export class TieFighter extends Enemy {
    constructor(game){
        super(game);
        this.width = 75.2;
        this.height = 88;
        this.x = Math.random() * (this.game.width * 0.95 - this.width);
        this.y = 0 - this.height;
        this.shootIntense = Math.random() * 1500 + 1000;
        this.lives = 3;
        this.deathScore = 5;
        this.image = document.getElementById('tie-fighter');
        this.frameY = 0;
    }
    update(deltaTime){
        this.y++;
        this.handleFrame(deltaTime);
        this.laserCounter(deltaTime);
        this.enemyLasers.forEach(laser => laser.update());
        this.enemyLasers = this.enemyLasers.filter(laser => !laser.toDelete);
    }
    draw(context){
        this.enemyLasers.forEach(laser => laser.draw(context));
        context.drawImage(this.image, this.frameX * this.width  + 5, this.frameY * this.height + 5, this.width, this.height, this.x, this.y, this.width * 1.2, this.height * 1.2);
    }
    shootEnemy(){
        this.enemyLasers.push(new EnemyLaser(this.game, this.x + 29, this.y + this.height * 0.5 + 5));
        this.enemyLasers.push(new EnemyLaser(this.game, this.x + this.width - 33, this.y + this.height * 0.5 + 5));
    }
}
  
export class TieAdvanced extends Enemy {
    constructor(game){
        super(game);
        this.width = 101;
        this.height = 79;
        this.x = 0 - this.width;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.shootIntense = 3000;
        this.lives = 2;
        this.deathScore = 3;
        this.image = document.getElementById('tie-bomber-left-right');
        this.frameY = 2;
        this.sound = new Audio('./sounds/tie-advanced_fly.mp3');
    }
    update(deltaTime){
        this.x++;
        if (this.y < this.game.height * 0.8) this.sound.play();
        this.handleFrame(deltaTime);
        this.bombCounter(deltaTime);
        this.enemyBombs.forEach(bomb => bomb.update());
        this.enemyBombs = this.enemyBombs.filter(bomb => !bomb.toDelete);
    }
    draw(context){
        this.enemyBombs.forEach(bomb => bomb.draw(context));
        context.drawImage(this.image, this.frameX * this.width  + 5, this.frameY * this.height + 5, this.width, this.height, this.x, this.y, this.width * 1.2, this.height * 1.2);
    }
    bombEnemy(){
        this.enemyBombs.push(new EnemyBomb(this.game, this.x + this.width*0.5, this.y + this.height));
    }
}

export class TieAdvancedInverse extends TieAdvanced {
    constructor(game){
        super(game);
        this.x = this.game.width;
        this.image = document.getElementById('tie-bomber-right-left');
    }
    update(deltaTime){
        this.x--;
        this.handleFrame(deltaTime);
        this.bombCounter(deltaTime);
        this.enemyBombs.forEach(bomb => bomb.update());
        this.enemyBombs = this.enemyBombs.filter(bomb => !bomb.toDelete);
    }
    draw(context){
        this.enemyBombs.forEach(bomb => bomb.draw(context));
        context.drawImage(this.image, this.frameX * this.width  + 5, this.frameY * this.height + 5, this.width, this.height, this.x, this.y, this.width * 1.2, this.height * 1.2);
    }
}

export class TieInterceptor extends Enemy {
    constructor(game){
        super(game);
        this.image = document.getElementById('tie-interceptor');
        this.x = Math.random() * (this.game.width * 0.95 - 70);
        this.y = this.game.height;
        this.width = 91;
        this.height = 70;
        this.lives = 5;
        this.deathScore = 8;
        this.frameY = 4;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
    }
    update(deltaTime){
        
        this.x = (this.game.width/2-this.width/2) * Math.sin(this.angle * Math.PI/70) + (this.game.width/2 - this.width/2);
        this.y = (this.game.height-this.height/2) * Math.cos(this.angle * Math.PI/270) + (this.game.height/2 - this.height/2);
        this.angle += 0.5;

        if (this.y < 0) this.frameY = 0;

        this.handleFrame(deltaTime);
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width  + 5, this.frameY * this.height + 5, this.width, this.height, this.x, this.y, this.width * 1.2, this.height * 1.2);
    }
}