const axios = require("axios");
const _ = require("lodash");
const { ApiKey, ApiKeyHeader } = require("./integration.json");

// Backend Server Configuration
// Determines the base URL depending on the environment (production or development)
const settings = {
  baseURL:
    process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000",
  withCredentials: true,
  headers: {
    [ApiKeyHeader]: ApiKey,
  },
};

if (process.env.NODE_ENV === "production") {
  module.exports = axios.create(settings);
}

if (process.env.NODE_ENV !== "production") {
  console.log("Development");

  const isNode =
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null;

  if (!isNode) {
    console.log("Browser Client");

    module.exports = axios.create(settings);
  } else {
    console.log("Nodejs Client");

    const fs = require("fs-extra");
    const tough = require("tough-cookie");
    const { wrapper } = require("axios-cookiejar-support");

    const COOKIE_JAR_FILE = "cookiejar.json";

    settings.jar = loadCookieJar();
    const client = axios.create(settings);

    console.log("foo");
    // Añade un interceptor de respuesta
    client.interceptors.response.use((response) => {
      const saveCookie =
        response.config.url.includes("/service/auth/login") ||
        response.config.url.includes("/service/auth/isAuthenticated");

      console.log({ request: response.config.url });

      // Verifica si la URL coincide con el endpoint específico
      if (saveCookie) {
        saveCookieJar(settings.jar);
      }
      return response;
    });

    module.exports = wrapper(client);

    function saveCookieJar(cookieJar) {
      const serializedJar = cookieJar.serializeSync();
      console.log(serializedJar);
      fs.writeJsonSync(COOKIE_JAR_FILE, serializedJar, { spaces: 2 });
    }

    function loadCookieJar() {
      if (fs.pathExistsSync(COOKIE_JAR_FILE)) {
        const serializedJar = fs.readJsonSync(COOKIE_JAR_FILE);
        return tough.CookieJar.deserializeSync(serializedJar);
      }
      return new tough.CookieJar();
    }
  }
}
