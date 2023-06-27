const routes = require('express').Router();

const items = require('../controler/items.js');

routes.get('/', items.getItems);

routes.get('/:id', items.getItem);

routes.post('/', items.createItem);

routes.put('/:id', items.updateItem);

routes.delete('/:id', items.deleteItem);

module.exports = routes;
