module.exports.validateObject = function(val, defaultVal) {
    if (val === null) return defaultVal;
    if (typeof val === 'object') return val;

    throw Error('Not an object ' + JSON.stringify(val));
}

module.exports.validateString = function(val, defaultVal) {
    if (val === null) return defaultVal;
    if (typeof val === 'string') return val;

    throw Error('Not a string ' + JSON.stringify(val));
};
