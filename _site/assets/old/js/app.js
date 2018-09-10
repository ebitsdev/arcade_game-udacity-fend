/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Create a modal to show the winning message when a player wins
function createModal(){
    const modalContainerHTMLString = '<div id="modalcontent"><div id="closebutton">+</div><div class="message-content">Congratulations, you won!</div></div>';
    const modalContainer = document.createElement('div');
    const container = document.querySelector('.container');
    let deck = document.querySelector('.deck');
    modalContainer.setAttribute("id", "modal");
    modalContainer.innerHTML = modalContainerHTMLString;
    container.insertBefore(modalContainer, deck);
}
// Close modal or modal container
function closeModal(ev){
    const modal = document.getElementById('modal');
    const modalCont = document.getElementById('modalcontent');
    const closebtn = document.getElementById('closebutton');
    if ( ev.target === modal || ev.target === modalCont || ev.target === closebtn){
        modal.remove();
        // console.log('You just clicked me');
    }
}
// This anonymous function to avoid exposing global variables

(function(){
    'use stric';
const allCards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
    'fa-leaf', 'fa-leaf'
];
let moves = 0;
let stopTimer;
// The function to start playing the game
function startGame() {
    const deck = document.querySelector('.deck');
    const cardElements = shuffle(allCards.map(function (singleCard) {
        return createCard(singleCard);
    }));
    deck.innerHTML = cardElements.join('');

}

function restartGame(){
    const deckOfCards = document.querySelectorAll('.card');
    const moveText = document.querySelector('.moves');
    document.querySelector('.restart').addEventListener('click', reset, false);

    function reset(ev){
        if (ev.target.classList.contains('fa-repeat')){
            location.reload();
        }
    }
}

// A card model to use in generating the deck of cards
function createCard(singleCard) {

    return '<li class="card" data-card="'+singleCard+'"><i class="fa ' + singleCard + '"></i></li>';

}
// Display a timer when a player starts playing
let timer = function(){
    if (timeBox.second === 59){
        timeBox.minute++;
        timeBox.second = 0;
    } else {
        timeBox.second++;
    }

let playingTime = String(timeBox.minute) + ':' + String(timeBox.second);
//
const mytimebox = document.getElementById('timebox');
mytimebox.innerText = playingTime;
}
function winningMessage(){
    const matchedCards = [];
    const allMatchedCards = document.querySelectorAll('.match');
    allMatchedCards.forEach(function(matchedCard){
        matchedCards.push(matchedCard);
    });

    if (matchedCards.length === 16){
        clearTimeout(timer.go);
        createModal();
    }
}

// Function to keep openCardArray count
function keepOpenCardsCount(cardArray, card) {
    cardArray.push(card);
    return cardArray;
}
// To show the open card symbol for cards that are clicked
function displayOpenCard(openCard) {

    openCard.classList.add('open', 'show');
}

// Reduce the number of stars as the number of moves increases
function reduceStars(){
    const stars = document.querySelector('#stars');
    // This removes the first star everytime it is invoked
    stars.removeChild(stars.children[0]);
}

// Lock all the matched cards in place
function lockMatchedCards(firstCard, secondCard) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
}
// create a timebox object to hold seconds and minutes
let timeBox = {
    second: 0,
    minute: 0,
    go: -1
};

// Keeps counts of all clicked cards
function getClickedCards() {
const moveCounter = document.querySelector('.moves');

// Card event handler function to check if the open cards match or not
function cardHandler(ev){
    // To check if the timer is not set yet and start the timer
    if (!timeBox.second){
        timer.go = setInterval(timer, 1000);
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (card) {
        const openCard = ev.target;
        if (openCard === card) {

            // clickedCards.push(openCard);
            keepOpenCardsCount(clickedCards, openCard);
            if (!card.classList.contains('show') && !card.classList.contains('open') && !card.classList.contains('match')) {
                //Keep record of clicked cards
                displayOpenCard(card);

                //Flip open cards when there are more than two

                if (clickedCards.length === 2) {
                    if (clickedCards[0].dataset.card === clickedCards[1].dataset.card){
                    // Lock matched cards
                       lockMatchedCards(clickedCards[0], clickedCards[1]);
                    }
                    setTimeout(function () {
                        clickedCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                        });
                        //Empty clickedCardsArray after the timeout
                        clickedCards = [];
                    }, 1000);

                }
                // Increment moves
                moves += 1;
                //Display move counts
                moveCounter.innerText = moves;
                winningMessage();
                // Reduce the number of stars based on the number of moves by the player
                if (moves === 15){
                    reduceStars();
                } if (moves === 25){
                    reduceStars();
                }
            }
        }

    });

    // Stop event propagation
    ev.stopPropagation();

}
// Function to listen for children that are clicked inside the deck of cards
    const myDeck = document.querySelector('.deck');
    const generalContainer = document.querySelector('.container');
    let clickedCards = [];
    // Create single listener on parent ul
    myDeck.addEventListener('click', cardHandler, false);
    generalContainer.addEventListener('click', closeModal, false);
}
//Start playing
startGame();
// Get the cards that were clicked
getClickedCards();
restartGame();
})();