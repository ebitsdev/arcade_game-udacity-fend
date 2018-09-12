/*
 * Create an instance of the Player class defined in entities.js
 */
"use strict";
const player = new Player();

// let allEnemies = [...Array(3)].map((_, i)=> new Enemy(0, i + 1));

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    let i = 0;
    let arr2 = [];
    for (i, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

let allEnemies = [].concat(_toConsumableArray(Array(3))).map(function(_, i) {
  return new Enemy(0, i + 1);
});
// Event listener to use in closing the modal
document.body.addEventListener('click', closeModal, false);
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

// Create a modal to show the winning message when a player wins
function createModal(){
  const modalContainerHTMLString = '<div id="modalcontent"><div id="closebutton">+</div><div class="message-content">Congratulations, you won!</div></div>';
  const modalContainer = document.createElement('div');
  const container = document.querySelector('body');
  const mainContainer = document.querySelector('.main-content');

  modalContainer.setAttribute("id", "modal");
  modalContainer.innerHTML = modalContainerHTMLString;
  container.insertBefore(modalContainer, mainContainer);
}
// Close modal or modal container
function closeModal(ev){
  const modal = document.getElementById('modal');
  const modalCont = document.getElementById('modalcontent');
  const closebtn = document.getElementById('closebutton');
  if ( ev.target === modal || ev.target === modalCont || ev.target === closebtn){
      modal.remove();
  }
}
function addGameTitle(el){
  const headerTxt = 'Classic Arcade Game';
  const header = document.createElement('h1');
  header.classList.add('header-title');
  header.innerText = headerTxt;
  el.appendChild(header);
}

// Add game instructions for players
function addGameInstructions(){

    const container = document.querySelector('.main-content');
    const gameInstructions = document.querySelector('.instructions');
    const gameInstructionsContent = '<h1>How to play this game</h1>'+
    '<p><em>Use the left and right arrow keys to move left or right.</em></p>'+
    '<p><em>Use the up and down keys to move the player up or down.</em></p>'+
    '<p><em>You win when you reach the top of the board, when you get to the water.</em></p>'
    gameInstructions.innerHTML = gameInstructionsContent;
    container.appendChild(gameInstructions);
}
// Add footer to the game
function addFooter(el){
const footerContent = '<div class="footer-main"><ul><li><a href="https://www.github.com/ebitsdev"><i class="fa fa-github"></i></a></li>'+
'<li><a href="https://www.twitter.com/ebamba"><i class="fa fa-twitter"></i></a></li><li><a href="https://www.linkedin.com/in/emmanuelbamba/"><i class="fa fa-linkedin"></i></a></li>'+
'</ul></div>';
el.classList.add('.footer');
el.innerHTML = footerContent;
}