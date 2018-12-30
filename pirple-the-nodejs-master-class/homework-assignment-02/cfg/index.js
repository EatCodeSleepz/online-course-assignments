/*** Config editable section begin ***/
const cfgBase = {
    'server-port' : null, // the value will be at profile section

    'data-dir': 'C:/Works/codes'
};

const cfgEnv = {};
cfgEnv['dev'] = {
    'server-port' : 8080
};
/*** Config editable section end ***/





const log = require('../log/ConsoleLogger')('cfg');

/*
The cfg key works without enclosing it with quotes (with valid property name off course).
But i choose to enclose it; the reason being, is to simplify Object.assign non deep clone.

Without deep clone, i put all in 1st level and enclosed the keys in quotes allows
grouping with dot or any separator like this:
{
    'server.port' : 8080,

    'data.dir' : 'xxx',
    'data.tmp' : 'yyy'
}
*/

// @TODO: For future enhancement, can support multi environments
const DEFAULT_ENV = 'dev';

const nodeEnv = process.env.NODE_ENV;
let activeEnv = null;
if (nodeEnv === null || nodeEnv === undefined) {
    log.info(`No active environment defined, default [${DEFAULT_ENV}] will be used.`);
    activeEnv = DEFAULT_ENV;
} else if (typeof nodeEnv === 'string') {
    if (typeof cfgEnv[nodeEnv] === 'object') { // valid, found
        activeEnv = nodeEnv;
    } else {
        const msg = `Invalid environment specified [${nodeEnv}]`;
        throw Error(msg);
    }
}

const finalCfg = Object.assign(cfgBase, cfgEnv[activeEnv]);

log.info(`Active env is set to [${activeEnv}]`);
log.debug(JSON.stringify(finalCfg));

module.exports.cfg = finalCfg;
