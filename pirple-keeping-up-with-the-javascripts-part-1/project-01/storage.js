/*
To simplify thing, i only do operation logic validation here.
Whether the param is null, correct type, etc etc assume the UI validation is bullet proof.

I'm aware that in real app, can't trust frontend. We do need to validate at backend side.
*/

const Storage = {
    USER: 'USR',
    LOGIN: 'LGN'
};

Storage.getUserById = function(userId) {
    const strUsr = localStorage.getItem(`${Storage.USER}_${userId}`);
    if (strUsr === null) return null;
    return JSON.parse(strUsr);
}

Storage.getUserByEmail = function(userEmail) {
    /*
    this method is inefficient. in relational database,
    email should be unique key and not part of primary key
    */
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (typeof key !== 'string' || !key.startsWith(Storage.USER + '_')) continue;

        const strUsr = localStorage.getItem(key);
        if (strUsr === null) continue;

        const user = JSON.parse(strUsr);
        if (user.email === userEmail) return user;
    }

    return null;
}

Storage.createUser = function(user) {
    const usr = Storage.getUserByEmail(user.email);
    if (usr !== null) throw Error('User already exist');

    user.userId = Date.now();
    localStorage.setItem(`${Storage.USER}_${user.userId}`, JSON.stringify(user));

    return user;
}

Storage.updateUser = function(user) {
    localStorage.setItem(`${Storage.USER}_${user.userId}`, JSON.stringify(user));

    return user;
}

Storage.getAllUsers = function() {
    const result = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (typeof key !== 'string' || !key.startsWith(Storage.USER + '_')) continue;

        const user = JSON.parse(localStorage.getItem(key));

        result.push(user);
    }

    return result;
}

/* session storage */
Storage.setLoginUserId = function(userId) {
    if (userId === null) return null;

    sessionStorage.setItem(Storage.LOGIN, userId + '');
}

Storage.getLoginUser = function() {
    const userId = sessionStorage.getItem(Storage.LOGIN);
    if (userId === null) return null;

    const user = Storage.getUserById(userId);

    return user;
}

Storage.clearUserLogin = function() {
    sessionStorage.removeItem(Storage.LOGIN);
}
