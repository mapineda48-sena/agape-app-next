const axios = require("axios");
const _ = require("lodash");
const { toForm } = require("../form/browser");
const { ApiKey, ApiKeyHeader } = require("./integration.json");

// Backend Server Configuration
// Determines the base URL depending on the environment (production or development)
const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    [ApiKeyHeader]: ApiKey,
  },
});

function makeRpc(pathname) {
  return (...args) => {
    return axiosInstance
      .post(pathname, toForm(args), { withCredentials: true })
      .then(({ data: [payload, dates] }) => {
        dates.forEach(([path, date]) => _.set(payload, path, new Date(date)));
        return payload;
      });
  };
}

module.exports = makeRpc;
