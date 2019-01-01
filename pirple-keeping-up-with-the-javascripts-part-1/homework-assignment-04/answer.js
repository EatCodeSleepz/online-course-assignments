/*
Answer
*/

console.log('Answer');

const mortals = ['Socrates', 'Plato', 'Aristotle'];

function isMortal(name) {
    return mortals.filter(e => e === name).length >= 1; 
}

console.log(`Is mortal Socrates ${isMortal('Socrates')}`); // true
console.log(`Is mortal Plato ${isMortal('Plato')}`); // true
console.log(`Is mortal Aristotle ${isMortal('Aristotle')}`); // true

console.log(`Is mortal elf ${isMortal('elf')}`); // false
console.log(`Is mortal new Object() ${isMortal(new Object())}`); // false

console.log(`Is mortal undefined ${isMortal(undefined)}`); // false
console.log(`Is mortal null ${isMortal(null)}`); // false
console.log(`Is mortal NaN ${isMortal(NaN)}`); // false


console.log();


/*
Bonus
*/

console.log('Bonus');

function tasteTheCake(availableFlavors, isChocolate) {
    // don't check with typeof 'array', will return object
    if (!Array.isArray(availableFlavors)) throw Error('Invalid flavors');

    const arrResult = availableFlavors.filter(e => {
        // note: this assume the tast is only chocolate and vanilla, as stated in prev assignment
        return e === (isChocolate ? 'chocolate' : 'vanilla');
    });

    return arrResult.join(','); // just in case the above result produces an array with more than 1 element
}

const flavors = ['chocolate', 'vanilla'];
let flavor = null;

flavor = tasteTheCake(flavors, true);
console.log(`Flavor 1: ${flavor}`); // chocolate

flavor = tasteTheCake(flavors, false);
console.log(`Flavor 2: ${flavor}`); // vanilla
