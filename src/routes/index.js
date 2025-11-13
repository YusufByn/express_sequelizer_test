// j'importe l'outil router depuis express
const { Router } = require('express')

const router = Router();

// les sous routes
// je commence par les sous routes de books
router.use('/books', require('./books.routes'));



// exportation de router a mettre dans app.js
module.exports = router;