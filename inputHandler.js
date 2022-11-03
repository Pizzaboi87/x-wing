export default class InputHandler {
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
            } else if (e.key === 'Enter'){
                this.game.ui.instructions = !this.game.ui.instructions;
            } else if (e.key === ' ' && this.game.gameOver){
                this.game.newGame();
            } 
        });
        window.addEventListener('keyup', e => {
            if (this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            }
        });
    }
}