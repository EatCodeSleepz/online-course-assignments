const Validation = {};

Validation.validateStringNotEmpty = function(id, objId, objVal, result) {
    if (objVal === null || typeof objVal !== 'string' || objVal.trim() === '') {
        return Validation._generateErrorResult(id, objId, objVal, result);
    }

    return result;
}

Validation.validateEmail = function(id, objId, objVal, result) {
    // note, i don't really test regex below against 'funny' email. maybe later

    if (objVal === null || typeof objVal !== 'string' ||
        !/^[^.]+?.*?[^.]@[^.]+?[.].+?[^.]$/.test(objVal)) {
        return Validation._generateErrorResult(id, objId, objVal, result);
    }

    return result;
}

Validation.validateBoolean = function(id, objId, objVal, result) {
    if (!objVal) {
        return Validation._generateErrorResult(id, objId, objVal, result);
    }

    return result;
}

Validation.constructSimpleErrorMsg = function(prmResult) {
    if (prmResult === null) return null;

    if (prmResult.errors === undefined || !Array.isArray(prmResult.errors))
        throw Error('Invalid param ' + JSON.stringify(prmResult));

    let msg = null;
    for (err of prmResult.errors) {
        msg = msg !== null ?
            `${msg}\n${err.id} ${err.objectId}` :
            `${err.id} ${err.objectId}` ;
    }

    return msg;
}

Validation._generateErrorResult = function(id, objId, objVal, result) {
    const res = (result !== null) ? result : {};
    if (res.errors === undefined) res.errors = [];
    else if (!Array.isArray(res.errors)) throw Error('Invalid validation result param, .errors must be array');

    res.errors.push({
        id: id,
        objectId: objId,
        objectValue: objVal
    });

    return res;
}
