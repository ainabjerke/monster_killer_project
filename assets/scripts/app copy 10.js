//GLOBAL VALUE
const ATTACK_VALUE = 10; // Normal attack damage
const STRONG_ATTACK_VALUE = 17; // Strong attack damage
const MONSTER_ATTACK_VALUE = 14; // Monster's attack damage
const HEAL_VALUE = 20;  // Healing amount

//STATICK VALUE THAT I THE DEVELOPER HAS CREATED
const MODE_ATTACK = "ATTACK"; //MODE_ATTACK = 0
const MODE_STRONG_ATTACK = "STRONG_ATTACK";// MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteretValue = prompt ("Maximum life for you and the monster", "100");
//empty array
let battleLog = [];

//We set up the player's and monster's health:
//Both the player and the monster start with 100 health points.
let chosenMaxLife = parseInt(enteretValue);
//JS checks if first isNaN(chosenMaxLife)is true then it will not continue with the next statement
//&& checks both condition is true to run the code
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
//the variable name for bolean must be written like this
let hasBonusLife = true;
//updates the health bar display.
adjustHealthBars(chosenMaxLife);

function writeToLog (ev, val, monsterHealth, playerHealth) {
    //
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        //add a new property dynamically by using .taget 
        logEntry.target = "MONSTER";
     
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event:ev,
            value:val,
            target: "MONSTER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
        // battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value:val,
            target: "PLAYER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
        // battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: "PLAYER",
            finalMonsterHealth:monsterHealth,
            finalPlayerHealth:playerHealth
        }
        // battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        }
        // battleLog.push(logEntry);
    }
    battleLog.push(logEntry);
}

function reset() {
//use the global value only use let if you want to change the global value
 currentMonsterHealth = chosenMaxLife;
 currentPlayerHealth = chosenMaxLife;
 resetGame(chosenMaxLife);   

}

//This function checks if the game is over:
//This function runs after every attack or heal to check if the game should end.
function endRound () {
   const initialPlayerHealth = currentPlayerHealth;//This saves the player's health before the monster attacks.This is useful in case the player has a bonus life.
   //The function dealPlayerDamage(MONSTER_ATTACK_VALUE) calculates how much damage the monster deals.
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
   currentPlayerHealth -= playerDamage;//That damage is subtracted from the player's current health.
   writeToLog(
    LOG_EVENT_MONSTER_ATTACK, 
    playerDamage, 
    currentMonsterHealth, 
    currentPlayerHealth
    );
   
   //*******Checking If the Player Has a Bonus Life ************/
   //both must be true 
   if (currentPlayerHealth <= 0 && hasBonusLife) {//If the player’s health drops to 0 or below (currentPlayerHealth <= 0) AND they have a bonus life, then:
    hasBonusLife = false;//The bonus life is removed
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth; //This restores the player's health instead of leaving it at 0.
    alert("You would be dead but the bonus life saved you!");
    setPlayerHealth(initialPlayerHealth);//updates the health display.
   }
   //*******Checking If the Player Has a Bonus Life end ************/


   //The monster attacks back and we subtract the damage from the player's health.
   //Now we check for different game outcomes:
   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
       alert ("You Won!!");
       writeToLog(
        LOG_EVENT_GAME_OVER, 
        "PLAYER WON", 
        currentMonsterHealth, 
        currentPlayerHealth
        );
      
   } //if you use else insted of else if the code in if statement will run
   //before moving on to the next line of code before the monster have
   //attacked so this is wong use else if will check if we have not wonned
   //maybe the monster won 
   else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
       alert ("You lost !!");
       writeToLog(
        LOG_EVENT_GAME_OVER, 
        "MONSTER WON", 
        currentMonsterHealth, 
        currentPlayerHealth
        );
   
   } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
       alert("You have a draw");
       writeToLog(
        LOG_EVENT_GAME_OVER, 
        "A DRAW", 
        currentMonsterHealth, 
        currentPlayerHealth
        );
     
   }
   if (
    currentMonsterHealth <= 0 || currentPlayerHealth <= 0)
     {
    reset();
   }
}

//not attached to a handler therefore we dont use handler in the functon name
//This function is responsible for attacking the monster.
function attackMonster(mode) {
    //***************decuide how much damage to go****************//
    const maxDamage = 
    mode === MODE_ATTACK 
    ? ATTACK_VALUE 
    : STRONG_ATTACK_VALUE;
    const logEvent = 
    mode === MODE_ATTACK 
    ? LOG_EVENT_PLAYER_ATTACK 
    : LOG_EVENT_PLAYER_STRONG_ATTACK;
    
    // let maxDamage;
    // let logEvent;
    // if (mode === MODE_ATTACK) {
    //     //If the player chooses normal attack, it does 10 damage.
    //     maxDamage = ATTACK_VALUE; // Normal attack 10 damage
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK) {
    //     //If the player chooses strong attack, it does 17 damage.
    //     maxDamage = STRONG_ATTACK_VALUE; // Strong attack 17 damage
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    // }
    //***************decuide how much damage to go end****************//
    //Hit the monster and reduce its health reduces the monster's health
     const damage = dealMonsterDamage(maxDamage); //actually applies the damage.
     console.log(damage); //The monster’s health (currentMonsterHealth) goes down by that amount.
     //reduce monster health
     // subtract that damage from currentMonsterHealth.

     currentMonsterHealth -= damage;
     //After attacking, we call endRound(); to check if the game is over.
     //This function checks if the monster or player has lost.
     //If someone’s health is 0 or less, the game ends.
     writeToLog(
        logEvent, 
        damage,
        currentMonsterHealth, 
        currentPlayerHealth
        );

     endRound();
}


//When the attack button is clicked, it calls attackMonster("ATTACK").
//This function calls attackMonster("STRONG_ATTACK") when the strong attack button is clicked.
function attackHandler() {
    //calls the function: attackMonster("ATTACK")
    //This means the player attacks the monster with a normal attack (ATTACK_VALUE = 10).
    attackMonster(MODE_ATTACK);
    console.log(attackMonster(MODE_ATTACK))
}

//When the strong attack button is clicked, it calls strongAttackHandler()
//This means the player attacks the monster with a strong attack 17 damage
function strongAttackHandler() {
   attackMonster(MODE_STRONG_ATTACK);
   }

//This function heals the player:
function healPlayerHandler() {
   // can not heal inifite, go above max value
   // // can not heal infinite, go above max value
   let healValue; //This variable will store how much health the player actually gains.
   //  // Prevent overhealing
   // this will be evaluated first hence precidence
   //chosenMaxLife - healValue chosenMaxLife 100 - HEAL_VALUE20 = 80
   // Checking if healing will exceed max health
   //currentPlayerHealth → The player's current health.
   //chosenMaxLife → The maximum health the player can have.
   //HEAL_VALUE → The fixed amount of health restored when healing (e.g., 20).
   //can not go abobe 100
   if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    //If healing would push health above chosenMaxLife, show an alert.
    alert("You cant heal to more then your max initial health");
    //heal back up but not abovee 100
    healValue = chosenMaxLife - currentPlayerHealth;
    // If no overhealing occurs, heal normally
   } else {
    healValue = HEAL_VALUE; //If healing won't push the health above chosenMaxLife, the player heals the full HEAL_VALUE.
   }
   increasePlayerHealth(HEAL_VALUE);// This is probably a function that updates the visual health bar.
   //update the value after healinging
   currentPlayerHealth += HEAL_VALUE; //Updates the actual health value in the game.
   //monster must hit us But the monster still attacks after healing.
   writeToLog(
    LOG_EVENT_PLAYER_HEAL, 
    healValue,
    currentMonsterHealth, 
    currentPlayerHealth
    );

   
   endRound(); // // Monster attacks after healing
   //This means the monster gets to attack next, ensuring that healing isn’t a free action without consequences.

}

function printLogHandler () {
    console.log(battleLog);
}
 

//Clicking "Attack" → Calls attackHandler(), which attacks the monster.
attackBtn.addEventListener("click", attackHandler);
//Clicking "Strong Attack" → Calls strongAttackHandler(), which does more damage.
strongAttackBtn.addEventListener ("click",strongAttackHandler);
//Clicking "Heal" → Calls healPlayerHandler(), which restores health.
healBtn.addEventListener("click",healPlayerHandler)

logBtn.addEventListener("click", printLogHandler);


/*The player chooses Attack, Strong Attack, or Heal by clicking a button.
If attacking:
Damage is calculated and applied to the monster.
The monster attacks back.
endRound() checks if someone won.
If healing:
The player heals.
The monster attacks back.
endRound() checks if someone won.
Let me know if you need any part explained more simply! 😊 */