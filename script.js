const grid = document.getElementById('grid');
const restartBtn = document.getElementById('restartBtn');
const timerDisplay = document.getElementById('timer');
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;
let timerInterval;
let elapsedTime = 0;

function initializeGame() {
    cards = [...cardValues, ...cardValues]; // Duplicate for pairs
    cards.sort(() => 0.5 - Math.random()); // Shuffle cards
    grid.innerHTML = '';
    matchedCards = 0;
    lockBoard = false;
    elapsedTime = 0;
    timerDisplay.textContent = "Time: 0 seconds"; // Reset timer display

    cards.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });

    startTimer(); // Start the timer when the game initializes
}

function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerDisplay.textContent = `Time: ${elapsedTime} seconds`;
    }, 1000);
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        resetBoard();
        if (matchedCards === cards.length) {
            setTimeout(() => {
                clearInterval(timerInterval); // Stop the timer
                alert(`You found all pairs in ${elapsedTime} seconds!`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

restartBtn.addEventListener('click', initializeGame);

// Initialize the game on page load
initializeGame();
