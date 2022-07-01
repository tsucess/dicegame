/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScores, activePlayer, gamePlaying, prevDice, input, winScore;


init();






document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {

        // 1. Random number
             var dice = Math.floor( Math.random() * 6) + 1; 
             var dice2 = Math.floor(Math.random() * 6) + 1;
             
        // 2. Display the result For Dice ONE
            var diceDom = document.querySelector('.dice');
            diceDom.style.display = 'block'; 
            diceDom.src = 'dice-' + dice + '.png';

                    // 2. Display the result For Dice TWO
            var diceDom1 = document.querySelector('.dice2');
            diceDom1.style.display = 'block'; 
            diceDom1.src = 'dice-' + dice2 + '.png';


            // SUM THE NUMBER OF BOTH DICE 
            totalDice = dice + dice2;

        // 3. Update the round score If the roll dice was not a number 1
        if (dice === 6 && prevDice === 6){
            // Add CURRENT score to Global score 
            scores[activePlayer] = 0;
                
            // Update the UI 
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
          
            // Next 
            nextPlayer();

        } else if (dice !== 1 && dice2 !== 1) {

                //Add score 
                roundScore += totalDice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }else{
                // Next 
                dice = 0;
                nextPlayer();     
            }
            
            prevDice = dice;
    }
    
    
});


// document.querySelector('.btn-score').addEventListener('click', setScore);


     
   
document.querySelector('.btn-hold').addEventListener('click', function() {
            if (gamePlaying) {
                // Add CURRENT score to Global score 
                scores[activePlayer] += roundScore;
                
                // Update the UI 
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

                input = document.querySelector('.set-score').value;


                // undefined, 0, null, or "" are coerced to false 
                // Anything else is coerced to true 

                if (input) {
                    winScore = input;
                } else {
                    winScore = 100;
                }
                // Check if player won the game 
                if (scores[activePlayer] >= winScore) {
                    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
                    document.querySelector('.dice').style.display = 'none';
                    document.querySelector('.dice2').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    gamePlaying = false;
                    
                } else {
                    // Next Player
                nextPlayer();
                }
            }
                
    
});



function nextPlayer() {
    prevDice = 0;
    // Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    // document.querySelector('.playr-0-panel').classList.remove('active');
    // document.querySelector('.playr-1-panel').classList.add('active');

    document.querySelector('.dice').style.display= 'none';
    document.querySelector('.dice2').style.display= 'none';
    
}


document.querySelector('.btn-new').addEventListener('click', init );


function init() {
        gamePlaying = true;
        scores = [0, 0];
        roundScore = 0;
        activePlayer = 0;
        prevDice = 0;
        // winScore = 100;


            document.querySelector('.dice').style.display= 'none';
            document.querySelector('.dice2').style.display= 'none';


        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');

    }





    // function setScore( ){
    // var setScore = document.querySelector('.set-score').value;
                // console.log(setScore);
// }