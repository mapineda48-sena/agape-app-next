const express = require("express");
const next = require("next");

module.exports = async function middleware() {
  const router = express.Router();
  const app = next({});
  const handle = app.getRequestHandler();

  await app.prepare();

  router.all("*", (req, res) => handle(req, res));

  return router;
};
