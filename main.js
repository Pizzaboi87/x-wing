window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 1000;
    
    class InputHandler {
      constructor(game){
        this.game = game;
        window.addEventListener('keydown', e => {
          if ((   e.key === 'ArrowLeft' ||
                  e.key === 'ArrowRight' ||
                  e.key === 'ArrowUp' ||
                  e.key === 'ArrowDown') &&
                  this.game.keys.indexOf(e.key) === -1){
                  this.game.keys.push(e.key);
          } else if (e.key === 'Control'){
            this.game.player.shoot();
          } else if (e.key === ' '){
            newGame();
          }
        });
        window.addEventListener('keyup', e => {
          if (this.game.keys.indexOf(e.key) > -1){
            this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
          }
        });
      }
    }
    
    class MyLaser {
      constructor(game, x, y){
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 3;
        this.height = 15;
        this.toDelete = false;
      }
      update(){
        this.y -= 10;
        if (this.y < -this.height) this.toDelete = true;
      }
      draw(context){
        context.save();
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
      }
    }
    
    class EnemyLaser extends MyLaser {
      constructor(game, x, y){
        super(game, x, y);
      }
      update(){
        this.y += 5;
        if (this.y > this.game.height - this.height) this.toDelete = true;
      }
      draw(context){
        context.save();
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
      }
    }
    
    class Player {
      constructor(game){
        this.game = game;
        this.x = 20;
        this.y = 100;
        this.frameX = 1;
        this.frameY = 5;
        this.height = 65;
        this.width = 100;
        this.myLasers = [];
        this.lives = 5;
        this.image = document.getElementById('x-wing');
      }
      update(){
        // controls
        if (this.game.keys.includes('ArrowRight')) this.x += 10;
        if (this.game.keys.includes('ArrowLeft')) this.x -= 10;
        if (this.game.keys.includes('ArrowUp')) this.y -= 10;
        if (this.game.keys.includes('ArrowDown')) this.y += 10;
        // boundaries
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // lasers
        this.myLasers.forEach(laser => laser.update());
        this.myLasers = this.myLasers.filter(laser => !laser.toDelete);
      }
      draw(context){
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 1.1, this.height * 1.1);
        this.myLasers.forEach(laser => laser.draw(context));
      }
      shoot(){
        this.myLasers.push(new MyLaser(this.game, this.x + 10, this.y));
        this.myLasers.push(new MyLaser(this.game, this.x + this.width - 6, this.y));
      }
    }
    
    class Enemy {
      constructor(game){
        this.game = game;
        this.x = Math.random() * this.game.width;
        this.y = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.width = 75.2;
        this.height = 88;
        this.toDelete = false;
        this.lives = 3;
        this.deathScore = 5;
        this.shootIntense = 1000;
        this.shootTime = 0;
        this.enemyLasers = [];
        this.image = document.getElementById('tie-fighter');
        this.maxFrame = 4;
        this.timer = 0;
        this.fps = 5;
        this.interval = 1000/this.fps;
      }
      update(deltaTime){
        this.y ++;
        if (this.y > this.game.height - this.height) this.toDelete = true;
        this.enemyLasers.forEach(laser => laser.update());
        this.enemyLasers = this.enemyLasers.filter(laser => !laser.toDelete);
        if (this.shootTime > this.shootIntense){
          this.shootEnemy();
          this.shootTime = 0;
        } else {
          this.shootTime += deltaTime;
        }
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
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width  + 5, this.frameY * this.height + 5, this.width, this.height, this.x, this.y, this.width * 1.2, this.height * 1.2);
        //context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width * 1.1, this.height * 1.1);
        this.enemyLasers.forEach(laser => laser.draw(context));
      }
      shootEnemy(){
        this.enemyLasers.push(new EnemyLaser(this.game, this.x + 29, this.y + this.height/2 + 5));
        this.enemyLasers.push(new EnemyLaser(this.game, this.x + this.width - 33, this.y + this.height/2 + 5));
      }
    }
    
    class UI {
      constructor(game){
        this.game = game;
        this.score = 0;
        this.winScore = 40;
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
        context.font = '30px Helvetica';
        context.fillText('Score: ' + this.score, 20, 50);
        context.fillText('Lives: ' + this.game.player.lives, 20, 100);
        if (this.game.gameOver){
          context.save();
          context.fillStyle = 'yellow';
          context.fillText(this.message, 50, 150);
          this.escapeOut = true;
          context.restore();
        }
      }
    }
    
    class Game {
      constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.enemies = [];
        this.enemyCounter = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
      }
      update(deltaTime){
        this.player.update();
        if (this.enemyCounter > this.enemyInterval){
          this.addEnemy();
          this.enemyCounter = 0;
        } else {
        this.enemyCounter += deltaTime;
        }
        this.enemies.forEach(enemy => {
          enemy.update(deltaTime);
          if (this.checkCollision(this.player, enemy)){
            enemy.toDelete = true;
            this.player.lives--;
          }
          this.player.myLasers.forEach(laser => {
            if (this.checkCollision(laser, enemy)){
                enemy.lives--;
                if (enemy.lives === 0) {
                  enemy.toDelete = true;
                  this.ui.score += enemy.deathScore;
                }
                laser.toDelete = true;
            }
          });
          enemy.enemyLasers.forEach(laser => {
            if (this.checkCollision(laser, this.player)){
                this.player.lives -= 0.5;
                laser.toDelete = true;
            }
          })
        });
        this.enemies = this.enemies.filter(enemy => !enemy.toDelete);
        this.ui.update();
      }
      draw(context){
        this.enemies.forEach(enemy => enemy.draw(context));
        this.player.draw(context);
        this.ui.draw(context);
      }
      addEnemy(){
        this.enemies.push(new Enemy(this));
      }
      checkCollision(box1, box2){
        return (
          box1.x < box2.x + box2.width &&
          box2.x < box1.x + box1.width &&
          box1.y < box2.y + box2.height &&
          box2.y < box1.y + box1.height
        )
      }
    }
    
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    
    function newGame(){
      game.player.lives = 5;
      game.ui.score = 0;
      game.gameOver = false;
      game.ui.escapeOut = false;
      animate(0);
   }
    
    function animate(timeStamp){
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.draw(ctx);
      game.update(deltaTime);
      if (!game.ui.escapeOut) requestAnimationFrame(animate);
    }
    animate(0);
  });