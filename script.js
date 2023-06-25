// HTML element variables
const healthBarsDiv = document.querySelector(".health-bars");
const playerHeartsDiv = document.querySelector(".player-health .hearts")
const computerHeartsDiv = document.querySelector(".computer-health .hearts")
const playerSelectionDiv = document.querySelector(".player-selection")
const computerSelectionDiv = document.querySelector(".computer-selection");
const messageDiv = document.querySelector(".message");
const howToPlayBtn = document.querySelector(".how-to-play-button");
const newGameBtn = document.querySelector(".new-game-button");
const fightersContainerDiv = document.querySelector(".fighters-container");
const horseBtn = document.querySelector(".horse-button");
const spearmanBtn = document.querySelector(".spearman-button");
const archerBtn = document.querySelector(".archer-button");

// Constants
const HORSE = "horse";
const SPEARMAN = "spearman";
const ARCHER = "archer";
const STARTING_HEALTH = 3;

// Starting variables
let playerHealth;
let computerHealth;

horseBtn.addEventListener("click", playRound);
spearmanBtn.addEventListener("click", playRound);
archerBtn.addEventListener("click", playRound);
newGameBtn.addEventListener('click', newGame);


function gameOver() {
    fightersContainerDiv.style.visibility = "hidden";
    newGameBtn.style.display = "flex";
    howToPlayBtn.style.display = "flex";
}

function randInt(number) {
    return Math.floor(Math.random() * number);
}

function getComputerSelection() {
    const choices = [HORSE, SPEARMAN, ARCHER];
    return choices[randInt(choices.length)];
}

function playRound() {
    const playerSelection = this.value;
    playerSelectionDiv.innerHTML = `<img src="img/${playerSelection}.png">`;  

    const computerSelection = getComputerSelection();
    computerSelectionDiv.innerHTML = `<img src="img/${computerSelection}.png">`;

    if (playerSelection === computerSelection) {
        messageDiv.innerHTML = `<h1>IT'S A TIE</h1><h3>This will not end the war</h3>`;
    }

    else if (
        playerSelection === HORSE && computerSelection === SPEARMAN ||
        playerSelection === SPEARMAN && computerSelection === ARCHER ||
        playerSelection === ARCHER && computerSelection === HORSE
    ) {
        messageDiv.innerHTML = `<h1>YOU LOSE</h1><h3>The enemy's ${computerSelection} beats your ${playerSelection}</h3>`;
        playerHealth--;
        playerHeartsDiv.removeChild(playerHeartsDiv.firstElementChild);
    }

    else if (
        playerSelection === HORSE && computerSelection === ARCHER ||
        playerSelection === SPEARMAN && computerSelection === HORSE ||
        playerSelection === ARCHER && computerSelection === SPEARMAN
    ) {
        messageDiv.innerHTML = `<h1>YOU WIN</h1><h3>Your ${playerSelection} beats the enemy's ${computerSelection}</h3>`;
        computerHealth--;
        computerHeartsDiv.removeChild(computerHeartsDiv.firstElementChild);
    }

    if (playerHealth < 1) {
        gameOver();
        messageDiv.innerHTML = "<h1>YOU HAVE BEEN DEFEATED!</h1>";
    } else if (computerHealth < 1) {
        gameOver();
        messageDiv.innerHTML = "<h1>YOU ARE VICTORIOUS!</h1>"
    }

}



function setHearts(n) {
    const heartsContainers = document.querySelectorAll(".hearts");
    heartsContainers.forEach((e) => {
        e.innerHTML = "";
        for (let i = 0; i < STARTING_HEALTH; i++) {
            const HEART_ICON = document.createElement("img");
            HEART_ICON.src = "img/heart.png";
            HEART_ICON.width = "30";
            e.appendChild(HEART_ICON);
        };
    });
}

function newGame() {
    healthBarsDiv.style.visibility = "visible";
    fightersContainerDiv.style.visibility = "visible";
    messageDiv.textContent = "Choose your fighter!";
    messageDiv.style.display = "block";
    howToPlayBtn.style.display = "none";
    newGameBtn.style.display = "none";
    playerSelectionDiv.innerHTML = "";
    computerSelectionDiv.innerHTML = "";
    playerHealth = STARTING_HEALTH;
    computerHealth = STARTING_HEALTH;
    setHearts(STARTING_HEALTH);
}