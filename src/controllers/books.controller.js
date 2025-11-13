const db = require('../models')
const Books = db.Books;

// test de controller et de router
exports.test = (req, res) => {
    console.log('on est bien arrivé ici donc le controller marche');
    res.send("si ca s'affiche c'est que ca marche !")
}

// affiche TOUS LES LIVRES avec un findAll
exports.listBooks = async (req, res) => {
    try{

        // tu utiliser findAll pour tous les trouver
        const books = await Books.findAll();

        // recup les livres et donc je les envoie en json
        res.status(200).json({
            success:true,
            message:"tout fonctionne, voici la liste des livres",
            data: books
        })

        // condition au cas ou y'a pas de livre
        if(!books){
            res.status(404).json({
                success:false,
                message:"y'a pas de livre j'ai rine trouvé",
                data: null
            })
        }

    }catch(error){
        console.log("y'a une erreur et la voici :", error);

        res.status(500).json({
            success:false,
            message:"il y'a une erreur, verifiez de nouveau",
            data: null
        })
    }
}

// AFFICHE un livre de par son id
exports.getBookById = async (req, res) => {
    try{
        // declaration d'une variable id que tu parses en number 
        const id = Number(req.params.id)
        // tu utilises findByPk avec id en paramètre
        const book = await Books.findByPk(id);

        res.status(200).json({
            success:true,
            message:`voici le livre n°${id}`,
            data: book
        })

        // condition si pas de livre ou pas d'id
        if(!book || !id){

            res.status(404).json({
                success:false,
                messsage:"problème de numéro indiqué ou livre non trouvé",
                data: null
            })
        }
    }catch(error){
        console.log("y'a une erreur et la voici :", error);

        res.status(500).json({
            success:false,
            message:"il y'a une erreur, verifiez a nouveau",
            data: null
        })
    }   
}

// Créer un livre
exports.CreateBook = async (req, res) => {

    try{

        const {title, author, disponibility} = req.body;

        if(!title || typeof title !=='string' || !author || typeof author !=='string' || typeof disponibility !=='boolean'){
            res.status(404).json({
                success:false,
                message:"Votre titre doit être valide, pareil pour l'auteur ainsi que la disponibilité",
                data:null
            })
        }

        const newBook = await Books.create({
            title: title,
            author: author,
            disponibility: disponibility
        })

        res.status(201).json({
            success:true,
            message:"Votre livre a bien été crée !",
            data: newBook
        })

    }catch(error){

        console.log("y'a une erreur et la voici :", error);

        res.status(500).json({
            success:false,
            message:"il y'a une erreur, verifiez a nouveau",
            data: null
        })
    }
}

// modifier un livre 
exports.editBook = async (req, res) => {

    try{

        // récupère l'id écris dans l'url
        const id = Number(req.params.id);
        // récupère dans le body dla request la dispo, le titre et l'auteur
        const {title, author, disponibility} = req.body;

        // on recherche le produit par son id 
        const book = await Books.findByPk(id);

        // verif si y'a un livre
        if(!book){
            res.status(404).json({
                success:false,
                message:'livre non trouvée',
                data: null
            })
        }
        
        // verif si les champs sont valides
        if(!title || typeof title !=='string' || !author || typeof author !=='string' || typeof disponibility !=='boolean'){
            res.status(404).json({
                success:false,
                message:"veuillez entrer un titre valide, pareil pour l'auteur ainsi que la disponibilité",
                data: null
            })
        }

        // execute les modifs
        book.title =  title;
        book.author = author;
        book.disponibility = disponibility;
        

        await book.save();

        res.status(200).json({
            success:true,
            message:`le livre n°${id} à été modifié avec succès!`,
            data: book
        })

    }catch(error){

        console.log("y'a une erreur et la voici :", error);

        res.status(500).json({
            success:false,
            message:"il y'a une erreur, verifiez a nouveau",
            data: null
        })
    }
}

// endpoint pour supprimer un livre
exports.delete = async (req, res) => {

    try{
        
        // on trouve l'id
        const id = Number(req.params.id);
        // trouver un livre de par son id
        const book = await Books.findByPk(id);

        // verif si y'a un livre
        if(!book){
            res.status(404).json({
                success:false,
                message:'livre non trouvée',
                data: null
            })
        }

        // verif si y'a un id
        if(!id){
            res.status(404).json({
                success:false,
                message:'livre non trouvée',
                data: null
            })
        }

        // on utilise la method destroy dans le book
        await book.destroy();

        // status 204 car c'est celui pour la suppression
        res.status(204).json({
            success:true,
            message:"les amis, on l'a supprimé.",
            data: null
        })


    }catch(error){

        console.log("y'a une erreur et la voici :", error);

        res.status(500).json({
            success:false,
            message:"il y'a une erreur, verifiez a nouveau",
            data: null
        })
    }
}

