const axios = require("./axios");
const _ = require("lodash");
const { toForm } = require("../form/browser");
const { ApiKey, ApiKeyHeader } = require("./integration.json");

function makeRpc(pathname) {
  return async (...args) => {
    return axios
      .post(pathname, toForm(args))
      .then(({ data: [payload, dates] }) => {
        console.log({ pathname, payload });
        dates.forEach(([path, date]) => _.set(payload, path, new Date(date)));
        return payload;
      });
  };
}

module.exports = makeRpc;
