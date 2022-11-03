import InputHandler from './inputHandler.js';
import Background from './background.js';
import Player from './player.js';
import UI from './ui.js';
import Explosion from './explosion.js';
import { TieAdvanced, TieFighter, TieAdvancedInverse, TieInterceptor} from './enemies.js';
import { BonusLife, StealPoints } from './bonusItems.js';

window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 1000;
  
  class Game {
    constructor(width, height){
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.ui = new UI(this);
      this.keys = [];
      this.enemies = [];
      this.bonusItems = [];
      this.explosions = [];
      this.enemyCounter = 0;
      this.bonusCounter = 0;
      this.enemyInterval = 1500;
      this.bonusInterval = Math.random() * 10000 + 15000;
      this.gameOver = false;
      this.background = new Background(this);
    }
    update(deltaTime){
      this.background.update();
      this.player.update(deltaTime);
      if (this.enemyCounter > this.enemyInterval){
        this.addEnemy();
        this.enemyCounter = 0;
      } else {
      this.enemyCounter += deltaTime;
      }
      if (this.bonusCounter > this.bonusInterval){
        this.addBonusItem();
        this.bonusCounter = 0;
      } else {
      this.bonusCounter += deltaTime;
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime);
        if (this.checkCollision(this.player, enemy)){
          this.explosions.push(new Explosion(this, enemy));
          enemy.toDelete = true;
          this.ui.score -= 10;
          this.player.lives -= 2;
        }
        this.player.myLasers.forEach(laser => {
          if (this.checkCollision(laser, enemy)){
            enemy.lives--;
            if (enemy.lives === 0) {
              this.explosions.push(new Explosion(this, enemy));
              enemy.toDelete = true;
              this.ui.score += enemy.deathScore;
            }
            laser.toDelete = true;
          }
        });
        if (enemy.enemyLasers){
          enemy.enemyLasers.forEach(laser => {
          if (this.checkCollision(laser, this.player)){
            this.player.lives --;
            this.ui.score -= 5;
            laser.toDelete = true;
          }
        })}
        if (enemy.enemyBombs){
          enemy.enemyBombs.forEach(bomb => {
          if (this.checkCollision(bomb, this.player)){
            this.player.lives --;
            this.ui.score -= 5;
            bomb.toDelete = true;
          }
        })}
      });
      this.enemies = this.enemies.filter(enemy => !enemy.toDelete);
      this.bonusItems.forEach(item => {
        item.update(deltaTime);
        if (this.checkCollision(this.player, item)){
          item.sound.play();
          item.toDelete = true;
          item.effect();
        }
      });
      this.bonusItems = this.bonusItems.filter(item => !item.toDelete);
      this.explosions.forEach(explosion => explosion.update(deltaTime));
      this.explosions = this.explosions.filter(explosion => !explosion.toDelete);
      this.ui.update();
    }
    draw(context){
      this.background.draw(context);
      this.bonusItems.forEach(item => item.draw(context));
      this.enemies.forEach(enemy => enemy.draw(context));
      this.explosions.forEach(explosion => explosion.draw(context));
      this.player.draw(context);
      this.ui.draw(context);
    }
    addEnemy(){
      let random = Math.random();
      if (random < 0.25) this.enemies.push(new TieFighter(this));
      else if (random < 0.5) this.enemies.push(new TieAdvanced(this));
      else if (random < 0.75) this.enemies.push(new TieAdvancedInverse(this));
      else this.enemies.push(new TieInterceptor(this));
    }
    addBonusItem(){
      let random = Math.random();
      if (random > 0.5) this.bonusItems.push(new BonusLife(this));
      else this.bonusItems.push(new StealPoints(this));
    }
    checkCollision(box1, box2){
      return (
        box1.x < box2.x + box2.width &&
        box2.x < box1.x + box1.width &&
        box1.y < box2.y + box2.height &&
        box2.y < box1.y + box1.height
      )
    }
    newGame(){
      this.player.lives = 10;
      this.ui.score = 0;
      this.ui.instructions = false;
      this.enemies = [];
      this.player.myLasers = [];
      this.bonusItems = [];
      this.explosions = [];
      this.player.x = this.width * 0.5 - this.player.width * 0.5;
      this.player.y = this.height - this.player.height;
      this.gameOver = false;
      this.ui.escapeOut = false;
      animate(0);
    }
  }
  
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;
  let music = new Audio('./sounds/space-battle.mp3');
  
  function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    music.play();
    if (!game.ui.escapeOut) requestAnimationFrame(animate);
  }

  animate(0);
  
});