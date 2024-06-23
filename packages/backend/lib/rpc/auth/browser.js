const rpc = require("../call/browser.js");

let isAuth = false;

const login = (() => {
    const loginRpc = rpc("/service/auth/login");

    return (...args) => loginRpc(...args).then(res => {
        isAuth = true;
        return res;
    });
})();

const logout = (() => {
    const logoutRpc = rpc("/service/auth/logout");

    return (...args) => logoutRpc(...args).then(res => {
        isAuth = false;
        return res;
    });
})();

const isAuthenticated = (() => {
    const isAuthenticatedRpc = rpc("/service/auth/isAuthenticated");

    return (...args) => isAuthenticatedRpc(...args).then(state => {
        isAuth = state;
        return state;
    });
})();

module.exports = {
    login,
    logout,
    isAuthenticated,
    isAuth
};
