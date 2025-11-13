'use strict';

// import du model depuis sequelize
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    // objet books et je le lie a model
    class Books extends Model {

        // avec cette ligne de code on va definir des relations
        static associate(models){

        }
    }

    // toujours initer EN DEHORS DE LA CLASS
    Books.init({
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        title:{
            // varchar de 150 donc faut préciser ici
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                len:[3, 150]
            }
        },
        author:{
            // varchar de 150 donc faut préciser ici 
            type: DataTypes.STRING(150),
            allowNull:false,
            validate:{
                len:[3,150]
            }
        },
        disponibility:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },{
        // ici on fait la configuration
        sequelize,
        // le nom de mon model en js
        modelName: 'Books',
        // nom de la table en BDD
        tableName: 'books',
        // on accepte les underscore snake case
        underscored:true,
        // gestion du temps dans created et updated at
        timestamps:true,
        // dans la db on écrit comme ca updated et created
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
return Books
};
