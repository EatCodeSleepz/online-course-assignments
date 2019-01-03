/*
Answer
*/

console.log('Answer');

function timeAdder(value1, label1, value2, label2) {
    let lbl1 = label1;
    let lbl2 = label2;

    const inSeconds = {
        second: 1,
        minute: 60,
        hour: 60 * 60,
        day: 60 * 60 * 24
    };

    // check type
    function validateType(value, label) {
        if ((typeof value !== 'number') || (typeof label !== 'string')) {
            const err = Error('Invalid type');
            err.value = value;
            err.label = label;

            throw err;
        }
    }

    function validatePositiveInteger(value) {
        if (!/^[0-9]+$/.test(value) || value <= 0) {
            const err = Error('Invalid positive integer');
            err.value = value;

            throw err;
        }
    }

    // quick and dirty plural checking, whether ends with s
    // all plural forms of valid labels end with s
    function validateSingularPlural(value, label) {
        const isValid = /^(second|minute|hour|day)(s?)$/i.test(label);
        const singularLabel = RegExp.$1;
        const isPlural = RegExp.$2 === 's' || RegExp.$2 === 'S';

        if (!isValid || (value <= 1 && isPlural) || (value > 1 && !isPlural)) {
            const err = Error('Invalid singular/plural');
            err.value = value;
            err.label = label;

            throw err;
        }

        return singularLabel;
    }

    function toSeconds(value, label) {
        const lbl = label.toLowerCase();

        switch (lbl) {
            case 'day':
            case 'days':
                return inSeconds.day * value;
            case 'hour':
            case 'hours':
                return inSeconds.hour * value;
            case 'minute':
            case 'minutes':
                return inSeconds.minute * value;
            case 'second':
            case 'seconds':
                return value;
            default:
                return undefined;
        }
    }

    try {
        validateType(value1, lbl1);
        validateType(value2, lbl2);

        validatePositiveInteger(value1);
        validatePositiveInteger(value2);

        lbl1 = lbl1.toLowerCase();
        lbl2 = lbl2.toLowerCase();

        lbl1 = validateSingularPlural(value1, lbl1); // return singular, lower case label
        lbl2 = validateSingularPlural(value2, lbl2); // return singular, lower case label
    } catch (err) {
        console.log(`${err.message} ${err.value} ${err.label}`);
        return false;
    }

    // try catch above just to catch validation error.
    // other processes outside try catch, below

    /* without using switch statement, can be like this
    const seconds1 = inSeconds[lbl1] * value1;
    const seconds2 = inSeconds[lbl2] * value2;
    */

    const seconds1 = toSeconds(value1, label1);
    const seconds2 = toSeconds(value2, label2);
    const totalSeconds = seconds1 + seconds2;

    console.log(`${value1} ${label1} = ${seconds1} second(s)`);
    console.log(`${value2} ${label2} = ${seconds2} second(s)`);
    console.log(`Total : ${totalSeconds} second(s)`);

    /*
    the answer, without bonus, just return below
    return [totalSeconds, totalSeconds >=1 ? 'seconds' : 'second'];
    */

    // the answer with bonus here
    for (const lbl of ['day', 'hour', 'minute', 'second']) { // the order is important
        const secs = inSeconds[lbl];
        const remainingSecs = totalSeconds % secs; // mode

        if (remainingSecs === 0) {
            val = totalSeconds / secs; // div
            const result = [val, val > 1 ? lbl + 's' : lbl];

            console.log(`Result: ${result[0]} ${result[1]}`);

            return result;
        }
    }

    return false;
}

let answer = null;

answer = timeAdder(1, 'minute', 3, 'minutes');
console.log(`[${answer}]\n`); // 4 minutes

answer = timeAdder(5, 'days', 25, 'hours');
console.log(`[${answer}]\n`); // 145 hours

answer = timeAdder(1, 'minute', 240, 'seconds');
console.log(`[${answer}]\n`); // 5 minutes

answer = timeAdder(20, 'hours', 4, 'hours');
console.log(`[${answer}]\n`); // 1 day

answer = timeAdder(20, 'hours', 5, 'hours');
console.log(`[${answer}]\n`); // 25 hours

/*
Answer
1 minute = 60 second(s)
3 minutes = 180 second(s)
Total : 240 second(s)
Result: 4 minutes
[4,minutes]

5 days = 432000 second(s)
25 hours = 90000 second(s)
Total : 522000 second(s)
Result: 145 hours
[145,hours]

1 minute = 60 second(s)
240 seconds = 240 second(s)
Total : 300 second(s)
Result: 5 minutes
[5,minutes]

20 hours = 72000 second(s)
4 hours = 14400 second(s)
Total : 86400 second(s)
Result: 1 day
[1,day]

20 hours = 72000 second(s)
5 hours = 18000 second(s)
Total : 90000 second(s)
Result: 25 hours
[25,hours]
*/
