const axios = require("axios");
const _ = require("lodash");
const { ApiKey, ApiKeyHeader } = require("./integration.json");

const isDev = process.env.NODE_ENV !== "production";

// Backend Server Configuration
// Determines the base URL depending on the environment (production or development)
const settings = {
  baseURL: !isDev ? "/" : "http://localhost:5000",
  withCredentials: !isDev,
  headers: {
    [ApiKeyHeader]: ApiKey,
  },
};

module.exports = axios.create(settings);
