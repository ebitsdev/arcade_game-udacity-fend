// Create an instance of the player
const player = new Player();
// // Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'assets/images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// // Now write your own player class
// // This class requires an update(), render() and
// // a handleInput() method.

// // Now instantiate your objects.
// // Place all enemy objects in an array called allEnemies
// We add 1 because of the starting point of the board
let allEnemies = [...Array(3)].map((_, i)=> new Enemy(0, i + 1));
// // Place the player object in a variable called player
// const player = {
//     'update': function(){},
//     'render': function(){}
// };
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'leftMove',
        38: 'topMove',
        39: 'rightMove',
        40: 'downMove'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
