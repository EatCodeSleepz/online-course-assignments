/*
Answer
*/

// bonus, prime
function isPrime(val) {
    if (val === 1) return false;
    if (val === 2) return true;

    for (let num = 2; num <= val - 1; num++) {
        if (val % num === 0) return false;
    }

    return true;
}

/*
Do note, i still print the number itelf just to make it easier to visualize;
instead of printing only Fizz/Buzz/FizzBuzz/Prime and skip the number
*/
for (let i = 1; i <= 100; i++) {
    const isOptimus = isPrime(i);
    if (isOptimus) {
        console.log(`${i} Prime`);
        continue; // continue approach
    }

    const isFizz = i % 3 == 0;
    const isBuzz = i % 5 == 0;

    // if else approach
    if (isFizz && isBuzz) {
        console.log(`${i} FizzBuzz`);
    } else {
        if (isFizz) console.log(`${i} Fizz`);
        else if (isBuzz) console.log(`${i} Buzz`);
        else console.log(`${i}`);
    }
}
