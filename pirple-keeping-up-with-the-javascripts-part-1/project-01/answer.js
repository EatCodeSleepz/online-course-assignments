function onClickHome() {
    Navigation.showPage(Navigation.HOME_PAGE);
}

function onClickSignUp() {
    Navigation.showPage(Navigation.SIGN_UP_PAGE);
}

function onClickEditUser() {
    onEditUserInit();
}

function onClickLogin() {
    Navigation.showPage(Navigation.LOGIN_PAGE);
}

function onClickLogout() {
    onLogout();
}

function onSignUp() {
    const elmFrm = document.getElementById('frmSignUp');

    const signUpData = {
        firstName: elmFrm.firstName.value,
        lastName: elmFrm.lastName.value,
        email: elmFrm.email.value,
        password: elmFrm.password.value
    };

    let valResult = null;
    valResult = Validation.validateStringNotEmpty('Must not empty', 'First name', signUpData.firstName, valResult);
    valResult = Validation.validateStringNotEmpty('Must not empty', 'Last name', signUpData.lastName, valResult);
    valResult = Validation.validateEmail('Invalid', 'Email', signUpData.email, valResult);
    valResult = Validation.validateStringNotEmpty('Must not empty', 'Password', signUpData.password, valResult);
    valResult = Validation.validateBoolean('Must agree to Term of Use', '', elmFrm.agree.checked, valResult);

    if (valResult !== null) {
        const errMsg = Validation.constructSimpleErrorMsg(valResult);
        Navigation.showErrorMessage(errMsg);
        return;
    }

    try { Storage.createUser(signUpData); } catch(err) {
        Navigation.showErrorMessage(`Error ${err}`);
        return;
    }

    Navigation.showPage(Navigation.LOGIN_PAGE);
    Navigation.showOkMessage(`Sign up successful. Please login.`);
}

function onLogin() {
    const elmFrm = document.getElementById('frmLogin');

    const loginData = {
        email: elmFrm.email.value,
        password: elmFrm.password.value
    };

    let valResult = null;
    valResult = Validation.validateEmail('Invalid', 'Email', loginData.email, valResult);
    valResult = Validation.validateStringNotEmpty('Must not empty', 'Password', loginData.password, valResult);

    if (valResult !== null) {
        const errMsg = Validation.constructSimpleErrorMsg(valResult);
        Navigation.showErrorMessage(errMsg);
        return;
    }

    let user = null;
    try {
        user = Storage.getUserByEmail(loginData.email);
        if (user === null || (user !== null && user.password !== loginData.password)) {
            Navigation.showErrorMessage(`Invalid login ${user.password} ${loginData.password}`);
            return;
        }
    } catch(err) {
        Navigation.showErrorMessage(`Error ${err}`);
        return;
    }

    Storage.setLoginUserId(user.userId);
    Navigation.showPage(Navigation.DASHBOARD_PAGE);
    Navigation.showOkMessage(`Welcome ${user.firstName} ${user.lastName}`);
}

function onLogout() {
    Storage.clearUserLogin();
    Navigation.showPage(Navigation.HOME_PAGE);
    Navigation.showOkMessage(`Thank you.`);
}

function onEditUserInit() {
    const user = Storage.getLoginUser();
    if (user === null) throw Error('No login user found');

    const frm = document.getElementById('frmEditUser');
    frm.userId.value = user.userId;
    frm.firstName.value = user.firstName;
    frm.lastName.value = user.lastName;
    frm.email.value = user.email;

    Navigation.showPage(Navigation.EDIT_USER_PAGE);
}

function onEditUser() {
    const user = Storage.getLoginUser();
    if (user === null) throw Error('No login user found');

    const elmFrm = document.getElementById('frmEditUser');

    const userId = Number.parseInt(elmFrm.userId.value);
    if (user.userId !== userId) throw Error(`Invalid operation [${user.userId}][${userId}]`);

    user.firstName = elmFrm.firstName.value;
    user.lastName = elmFrm.lastName.value;
    user.email = elmFrm.email.value;

    let valResult = null;
    valResult = Validation.validateStringNotEmpty('Must not empty', 'First name', user.firstName, valResult);
    valResult = Validation.validateStringNotEmpty('Must not empty', 'Last name', user.lastName, valResult);
    valResult = Validation.validateEmail('Invalid', 'Email', user.email, valResult);

    if (valResult !== null) {
        const errMsg = Validation.constructSimpleErrorMsg(valResult);
        Navigation.showErrorMessage(errMsg);
        return;
    }

    try { Storage.updateUser(user); } catch(err) {
        Navigation.showErrorMessage(`Error ${err}`);
        return;
    }

    Navigation.showOkMessage(`Update success.`);
}
