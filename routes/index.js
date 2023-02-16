const routes = require("express").Router();

routes.use("/bosses", require("./bosses"));
routes.use("/items", require("./items.js"));

module.exports = routes;