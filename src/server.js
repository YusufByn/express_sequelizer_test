// charger les variables du dotenv (les variables d'environnement du .env)
// car dans notre .env nous avons le port (celui qu'on va utiliser pour le lancement du server)
require('dotenv').config();

// importation de mon application étant donné qu'on en a besoin quoi pour le lacnement
const app = require('./app');

// récupération du port depuis le env
const PORT = process.env.PORT

// condition pour voir si le PORT existe
if(!PORT){
    // on envoie ca en console
    console.log("le server n'a pas pu se lancer je ne trouve pas le port !");
    // on stop le programme de lancement, le 1 veut dire que c'est un erreur, si j'avais mis 0
    // ca aurait compris que c'est bon
    process.exit(1)
    
}

// lancement du server avec un console log qui nous indique que le server est bien lancé
app.listen(PORT, ()=>{
    console.log(`Le server est lancé sur le port suivant : ${PORT}`);
})