// Create a generic game entity class to enherit from for the player or the enemy
class GameEntity {
    // Create a constructor to create an instance
    constructor(){
        this.sprite = 'assets/images/';
        this.x = 2;
        this.y = 5;
    }

    // Create function to reset player or enemy position
    // resetPosion() {
    //     this.x
    // }
    // Update function to be used by the player and enemy objects
    update(dt){
        this.offScreenleftRightX = this.x > 5;
        this.offScreenTopDownY = this.y < 1;
    }
    render(){
        // The number in this are for offsetting the sprite (image) on the screen
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    // To check for collisions between the player and the enemies

    checkCollisions(entity){
        // Using a block movement on the board
        // Check if the player or enemey are on the same block, i.e close to one another
        if (this.y === entity.y){
            // The number here represents the sensivity in detecting the collision
            if (this.x >= entity.x - 0.6 && this.x <= entity.x + 0.6){
                return true;
            }
        } else {
            return false;
        }
    }
}
// Create a player class enheriting from the GameEntity class

class Player extends GameEntity{
    constructor(){
        // To enherit from the main class
        super();
        this.sprite += 'char-boy.png';
        // To check if the player is moving or not
        this.inMovement = false;
        // Check if there is a victory
        this.victory = false;
    }

    // Reset the movement of the player using the render function
    render() {
        super.render();
            this.inMovement = false;
            // Resetting the game
            this.gameReset();
    }
      // Reset the game after victory
      gameReset(){
        if (this.victory && !this.offScreenTopDownY){
            this.victory = false;
        }
    }
    // Update the status of the game for the player
    update(dt){
        super.update();
        /**
         * Check if the player is off the screen, not moving and has not already won
         */

        if (this.offScreenTopDownY && !this.inMovement && !this.victory){
            console.log('Congratulation you won');
            this.victory = true;
            // Reset the player position
            this.resetPlayerPosition();
        }
    }
    /**
     * Reset the player
     */
    resetPlayerPosition(){
        this.y = 5;
    }
    // HandleInput
    handleInput(input){
        switch(input) {
            case 'leftMove':
            // control the movement of the player when at the edge
                this.x = this.x > 0 ? this.x - 1 : this.x;
            break;
            case 'topMove':
                this.y = this.y > 0 ? this.y - 1 : this.y;
                break;
            case 'rightMove':
                this.x = this.x < 4 ? this.x + 1 : this.x;
                break;
            case 'downMove':
                this.y = this.y < 5 ? this.y + 1 : this.y;
            default:
                break;
        }
        //Set the movement of the player to true
        this.inMovement = true;
    }
}

// Create the enemy class
class Enemy extends GameEntity{
    constructor(x, y, speed){
        //To enherity
        super();
        //Generate the sprite (bugs)
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = Math.random() * 500;
    }
    update(dt){
        // Enherit the update function the main class
        super.update();
        if(this.offScreenleftRightX){
            // -1 to indicate the enemy is coming off screen
            this.x = -1;
        }else {
            // dt = delta in time
            //We could use a random generation of the dt to get the bugs moving at a diff pace.
            this.x += Math.random() / dt * 0.002;
            this.speed += this.speed + dt;
        }
    }
}