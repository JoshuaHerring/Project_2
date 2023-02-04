const routes = require("express").Router();

const bosses = require("../controler/bosses")

routes.get("/", bosses.getBosses);
routes.get("/:id", bosses.getBoss);

routes.post('/', bosses.createBoss);

routes.put('/:id', bosses.updateBoss);

routes.delete("/:id", bosses.deleteBoss);

module.exports = routes;