/*
First thing comes to my mind reading this kind of question is... object, inheritance.
But since the course not reaching there yet, and there's OOP subject in the coming course, i try other approach.
*/

/*
APPROACH #1
*/
console.log('Approach #1');

// men are mortal
const man = 
{
    mortal : true
}

// Socrates
const socrates = {
    name : 'Socrates'
}

// Socrates is a man
// Note, the order is important. The properties of the latter overwrites the former.
const manSocrates = Object.assign(socrates, man);


console.log(`Is Socrates mortal? ${manSocrates.mortal}`);
console.log(`Socrates ${JSON.stringify(manSocrates)}`);

// with if else
if (manSocrates.mortal) console.log(`Socrates is mortal`);
else console.log(`Socrates is immortal?`);


console.log();


/*
APPROACH #2
Since the question mentions about collection, items, part of collection... Here's the array approach.
*/
console.log('Approach #2');

const men = [];
men.mortal = true;

men.push('Socrates');

console.log(`Men ${JSON.stringify(men)}`);
console.log(`Is mortal? ${men.mortal}`);

if (men.mortal) console.log(`Men are mortal`);
else console.log(`Men are immortal`);

if (men.indexOf('Socrates') >= 0) console.log(`Socrates is a man`);
else console.log(`Socrates is not a man`);


console.log();


/*
Bonus
*/
console.log('Bonus');

const CAKE_FLAVOR = {
    VANILLA : 'vanilla',
    CHOCOLATE: 'chocolate'
}

const cake = {
    flavor : CAKE_FLAVOR.VANILLA // JS can't really limit enum unless using TS?
}

if (cake.flavor !== CAKE_FLAVOR.CHOCOLATE) {
    console.log('The cake is vanilla flavor.');
} else if (cake.flavor !== CAKE_FLAVOR.VANILLA) {
    console.log('The cake is chocolate flavor.');
} else {
    // trivia? the code never enters this block :)
    console.log('The cake has no flavor.');
}
