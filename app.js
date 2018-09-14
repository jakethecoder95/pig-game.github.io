/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points, or the amount of point one chooses, on GLOBAL score wins the game
*/


var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice, lastDice2;
var targetScore;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Randome number
        var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice[0] + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice[1] + '.png';



        //3. Check if last and current dice roll boty equal 6
        if ((lastDice === 6 && dice[0] === 6) || (lastDice2 === 6 && dice[1] == 6)) {
            //player looses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            roundScore = 0;
            nextPlayer();
        } else {

            // 4. Update the round score if the rolled number was NOT a 1
            if (dice[0] !== 1 && dice[1] !== 1) {
                //Add score
                roundScore += dice[0] + dice[1];
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            } else {
                //Round score to 0 & Next player
                nextPlayer();
            }

            lastDice = dice[0];
            lastDice2 = dice[1];
        }
    }
});

// Activate the Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = targetScore = document.getElementById('target-score').value;
        var targetScore;

        // Undifined, 0, null, or "" are coerced to false
        // Anything else is coerced to true
        if (input) {
            targetScore = input;
        } else {
            targetScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= targetScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    document.querySelector('#current-' + activePlayer).textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    lastDice = null;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;
