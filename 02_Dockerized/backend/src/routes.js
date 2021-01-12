const express = require('express');

const BookController = require('./controllers/BookController')

const routes = express.Router();

routes.get('/book', BookController.index);
routes.get('/book/:id', BookController.findById);
routes.post('/book', BookController.create);
routes.put('/book', BookController.update);
routes.delete('/book/:id', BookController.delete);

module.exports = routes;