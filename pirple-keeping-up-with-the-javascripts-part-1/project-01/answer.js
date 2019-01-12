function onClickHome() {
    Navigation.showPage(Navigation.HOME_PAGE);
}

function onClickSignUp() {
    Navigation.showPage(Navigation.SIGN_UP_PAGE);
}

function onClickEditUser() {

    Navigation.showPage(Navigation.EDIT_USER_PAGE);
}

function onClickLogin() {
    Navigation.showPage(Navigation.LOGIN_PAGE);
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

    

    Navigation.showPage(Navigation.DASHBOARD_PAGE);
    Navigation.showOkMessage(`Welcome ${user.firstName} ${user.lastName}`);
}

function onEditUser() {

}

window.onload = function() {
    Navigation.showPage(Navigation.HOME_PAGE);
};
