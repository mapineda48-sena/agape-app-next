const rpc = require("../call/browser.js");

const user = {};

const login = (() => {
  const loginRpc = rpc("/service/auth/login");

  return (...args) =>
    loginRpc(...args).then((user) => {
      module.exports.user = user;
    });
})();

const logout = (() => {
  const logoutRpc = rpc("/service/auth/logout");

  return (...args) =>
    logoutRpc(...args).then((res) => {
      module.exports.user = user;
      return res;
    });
})();

const isAuthenticated = (() => {
  const isAuthenticatedRpc = rpc("/service/auth/isAuthenticated");
  return () =>
    isAuthenticatedRpc().then((user) => {
      console.log({ user });
      module.exports.user = user;
    });
})();

module.exports = {
  login,
  logout,
  isAuthenticated,
};

//module.exports.sync = isAuthenticated().catch(() => {});
