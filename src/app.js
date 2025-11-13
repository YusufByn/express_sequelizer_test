// j'importe express ainsi que les autres packets ici
// (j'ai ctrl + click a chaque ligne ici pour voir si c'était bon)
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

// création de mon application 
const app = express();

// les middlewares dit dans mon bloc note
// qui seront utilisé par mon application express
// le cors (cross origin etc) en gros on accepte les requete cross origin
app.use(cors());

// parser le json
app.use(express.json());

// log les requetes http(va indiquer si c'est du get post ou autre avec les MS)
app.use(morgan('dev'));

// chercher mes routes sous la route /api
app.use('/api', router)


// exportation de mon application
module.exports = app
