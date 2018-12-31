/*
hoisting, regardless the location where the variables is declared,
if within visible block, other codes can access it.

Following code is located at top of the page, but can access to variable exVar below.
Note:
const and let cannot be hoisted.
only can hoist the variable, not the value assignment.
*/

try { console.log(`exObj = ${exObj}`); } catch (err) { console.log('Cannot hoist exObj'); }
try { console.log(`max = ${max}`); } catch (err) { console.log('Cannot hoist max'); }

 // exVar was declared with var, can be hoisted, but only the variable not the value assigned to it.
console.log(`exVar = ${exVar}`); // undefined, no value yet



/*
const, for variables that will not experience changes. On most cases, just start everything with const first, then when necessary to change the value, switch to let.

Do note that the const only restrict the variable's reference can't be changed, not necessary the value of the object the reference points to
*/
const exText = 'Hello';

const exObj = {
    one : 1,
    two : 2
};
exObj['three'] = 3; // valid, change the object's value, not the reference to the object

try { exObj = null; } catch (err) { console.log('This will produce error'); }



/*
let, for variables that will experience value changes. Maybe to store value for some calculation / buffer.
*/

const numbers = [1, 3, 5, 2, 4, 6, 0];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) { // another let
    const num = numbers[i];
    if (max < num) max = num;
}
console.log(`Max number is [${max}]`);



/*
var, from the previous versions. in most cases, same as let.
Need to take note that var is only limited to function scope, not till block scope;
While let's visibility is till block scope.
*/

if (true) {
    var exVar = 'Var value';
}

console.log(`exVar = [${exVar}]`);
