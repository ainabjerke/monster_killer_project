//GLOBAL VALUE
const ATTACK_VALUE = 10; // Normal attack damage
const STRONG_ATTACK_VALUE = 17; // Strong attack damage
const MONSTER_ATTACK_VALUE = 14; // Monster's attack damage
const HEAL_VALUE = 20;  // Healing amount

//We set up the player's and monster's health:
//Both the player and the monster start with 100 health points.
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

//updates the health bar display.
adjustHealthBars(chosenMaxLife);

//This function checks if the game is over:
//This function runs after every attack or heal to check if the game should end.
function endRound () {
    
   const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
   currentPlayerHealth -= playerDamage;
   //The monster attacks back and we subtract the damage from the player's health.
   //Now we check for different game outcomes:
   if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
       alert ("You Won!!");
   } //if you use else insted of else if the code in if statement will run
   //before moving on to the next line of code before the monster have
   //attacked so this is wong use else if will check if we have not wonned
   //maybe the monster won 
   else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
       alert ("You lost !!");

   } else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
       alert("You have a draw");
   }
}

//not attached to a handler therefore we dont use handler in the functon name
//This function is responsible for attacking the monster.
function attackMonster(mode) {
    //***************decuide how much damage to go****************//
    let maxDamage;
    if (mode === "ATTACK") {
        //If the player chooses normal attack, it does 10 damage.
        maxDamage = ATTACK_VALUE; // Normal attack 10 damage
    } else if (mode === "STRONG_ATTACK") {
        //If the player chooses strong attack, it does 17 damage.
        maxDamage = STRONG_ATTACK_VALUE; // Strong attack 17 damage
    }
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
     endRound();
}


//When the attack button is clicked, it calls attackMonster("ATTACK").
//This function calls attackMonster("STRONG_ATTACK") when the strong attack button is clicked.
function attackHandler() {
    //calls the function: attackMonster("ATTACK")
    //This means the player attacks the monster with a normal attack (ATTACK_VALUE = 10).
    attackMonster("ATTACK");
    console.log(attackMonster("ATTACK"))
}

//When the strong attack button is clicked, it calls strongAttackHandler()
//This means the player attacks the monster with a strong attack 17 damage
function strongAttackHandler() {
   attackMonster("STRONG_ATTACK");
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
   endRound(); // // Monster attacks after healing
   //This means the monster gets to attack next, ensuring that healing isn’t a free action without consequences.

}

//Clicking "Attack" → Calls attackHandler(), which attacks the monster.
attackBtn.addEventListener("click", attackHandler);
//Clicking "Strong Attack" → Calls strongAttackHandler(), which does more damage.
strongAttackBtn.addEventListener ("click",strongAttackHandler);
//Clicking "Heal" → Calls healPlayerHandler(), which restores health.
healBtn.addEventListener("click",healPlayerHandler)



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