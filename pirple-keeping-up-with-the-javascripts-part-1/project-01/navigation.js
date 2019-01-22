const Navigation = {
    HOME_PAGE: 'pgHome',
    SIGN_UP_PAGE: 'pgSignUp',
    LOGIN_PAGE: 'pgLogin',
    DASHBOARD_PAGE: 'pgDashboard',
    EDIT_USER_PAGE: 'pgEditUser',

    MESSAGE_BAR: 'msgBar',

    states: {
        activePage: 'pgHome'
    },

    pages: {
        pgHome: {
            id: 'pgHome',
        },

        pgSignUp: {
            id: 'pgSignUp',
        },

        pgEditUser: {
            id: 'pgEditUser',
        },

        pgLogin: {
            id: 'pgLogin',
        },

        pgDashboard: {
            id: 'pgDashboard',
        }
    }
};

Navigation.showPage = function(id) {
    if (Navigation.pages[id] === undefined) throw Error(`Invalid page id [${id}]`);

    let elm = null;

    Navigation.refreshMenu();
    Navigation.closeMessage();

    elm = document.getElementById(Navigation.states.activePage);
    elm.classList.add('no-display');

    elm = document.getElementById(id);
    elm.classList.remove('no-display');

    Navigation.states.activePage = id;
};

Navigation.showOkMessage = function(msg) {
    Navigation.closeMessage();

    const elm  = document.getElementById(Navigation.MESSAGE_BAR);
    elm.classList.add('alert', 'alert-primary');
    elm.classList.remove('invisible');
    elm.classList.add('visible');
    elm.innerText = msg;
};

Navigation.showErrorMessage = function(msg) {
    Navigation.closeMessage();

    const elm  = document.getElementById(Navigation.MESSAGE_BAR);
    elm.classList.add('alert', 'alert-danger');
    elm.classList.remove('invisible');
    elm.classList.add('visible');
    elm.innerText = msg;
};

Navigation.closeMessage = function() {
    const elm  = document.getElementById(Navigation.MESSAGE_BAR);
    elm.classList.remove('visible');
    elm.classList.add('invisible');
    elm.classList.remove('alert', 'alert-primary', 'alert-danger');
    elm.innerText = '';
};

Navigation.refreshMenu = function() {
    const user = Storage.getLoginUser();
    const isLogin = user !== null;

    for (let elmId of ['navLogout', 'navAccSttg']) {
        const elm = document.getElementById(elmId);
console.log(`xXx elmId 1 [${elmId}][isLogin=${isLogin}]`);
        if (isLogin) { // show when login
            elm.classList.remove('no-display');
        } else {
            elm.classList.add('no-display');
        }
    }

    for (let elmId of ['navLogin', 'navSignUp']) {
        const elm = document.getElementById(elmId);
console.log(`xXx elmId 2 [${elmId}][isLogin=${isLogin}]`);
        if (isLogin) { // hide when login
            elm.classList.add('no-display');
        } else {
            elm.classList.remove('no-display');
        }
    }

}
