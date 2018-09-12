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
  const canvas = document.querySelector('canvas');

  modalContainer.setAttribute("id", "modal");
  modalContainer.innerHTML = modalContainerHTMLString;
  container.insertBefore(modalContainer, canvas);
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