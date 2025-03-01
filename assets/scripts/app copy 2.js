//GLOBAL VALUE
const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);


function attackHandler() {
 const damage = dealMonsterDamage(ATTACK_VALUE);
 currentMonsterHealth -= damage;
 const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
 currentPlayerHealth -= playerDamage;
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

function strongAttackHandler () {

    const damage = dealMonsterDamage(STRONG_ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
    currentPlayerHealth -= playerDamage;
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



attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener ("click",strongAttackHandler)