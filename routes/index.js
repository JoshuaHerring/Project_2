const routes = require("express").Router();

routes.use("/bosses", require("./bosses"));

module.exports = routes;