const { Router } = require('express');
const booksController = require('../controllers/books.controller');
const router = Router();

router.get('/test', booksController.test);
router.get('/', booksController.listBooks);
router.get('/:id', booksController.getBookById);
router.post('/', booksController.CreateBook);
router.put('/:id', booksController.editBook);
router.delete('/:id', booksController.delete);

module.exports = router
