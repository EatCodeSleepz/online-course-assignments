const v = require('../util/SimpleValidationUtil');
const log = require('../log/ConsoleLogger')('UserService');

module.exports.create = function(newUsr) {
    log.debug('Create ' + JSON.stringify(newUsr));
    v.validateObject(newUsr);

    const email = v.validateString(newUsr.email);
    const name = v.validateString(newUsr.name);
    const addr = v.validateString(newUsr.address);

    const usr = {
        email: email,
        name: name,
        address: addr
    }

    log.debug('xXx Create ' + JSON.stringify(usr));
};

module.exports.read = function(newUser) {
    log.debug('Create ' + JSON.stringify(newUser));
};

module.exports.update = function(newUser) {
    log.debug('Create ' + JSON.stringify(newUser));
};

module.exports.delete = function(newUser) {
    log.debug('Create ' + JSON.stringify(newUser));
};
