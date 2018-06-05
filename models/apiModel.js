let sequelize = require('../connection/sequelizeconnection');
const SEQUELIZE = require('sequelize');
const Op = SEQUELIZE.Op;

const UsersModel = require('./usersModel');
let usersModel = new UsersModel();
const User = usersModel.getUserModelSequelize();

const Gasolinera = sequelize.define('gasolineras', {
    'Rótulo': {
        type: SEQUELIZE.STRING
    },
    'Horario': {
        type: SEQUELIZE.STRING
    },
    'Dirección': {
        type: SEQUELIZE.STRING
    },
    'Latitud': {
        type: SEQUELIZE.STRING
    },
    'Longitud (WGS84)': {
        type: SEQUELIZE.STRING
    },
    'Precio Biodiesel': {
        type: SEQUELIZE.STRING,
    },
    'Precio Bioetanol': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gas Natural Comprimido': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gas Natural Licuado': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gases licuados del petróleo': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gasoleo A': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gasoleo B': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gasolina 95 Protección': {
        type: SEQUELIZE.STRING,
    },
    'Precio Gasolina  98': {
        type: SEQUELIZE.STRING,
    },
    'Precio Nuevo Gasoleo A': {
        type: SEQUELIZE.STRING,
    },
})

const Review = sequelize.define('reviews', {
    'Comentario': {
        type: SEQUELIZE.STRING
    },
    'Puntuacion': {
        type: SEQUELIZE.INTEGER
    },
    'DireccionGasolinera': {
        type: SEQUELIZE.STRING
    },
    'EmailUsuario': {
        type: SEQUELIZE.STRING
    },
    'Activa': {
        type: SEQUELIZE.BOOLEAN
    },

});

const Favoritos = sequelize.define('favoritos', {
    'Latitud': {
        type: SEQUELIZE.FLOAT
    },
    'Longitud (WGS84)': {
        type: SEQUELIZE.FLOAT
    },
    'Rótulo': {
        type: SEQUELIZE.STRING
    },
    'Horario': {
        type: SEQUELIZE.STRING
    },
    'Tipo': {
        type: SEQUELIZE.STRING
    },
    'Precio': {
        type: SEQUELIZE.FLOAT
    },
    'Dirección': {
        type: SEQUELIZE.STRING
    },
    'EmailUsuario': {
        type: SEQUELIZE.STRING
    }
})

Gasolinera.hasMany(Review, { foreignKey: 'DireccionGasolinera', sourceKey: 'Dirección' });
Review.belongsTo(Gasolinera, { foreignKey: 'DireccionGasolinera', targetKey: 'Dirección' });

User.hasMany(Review, { foreignKey: 'EmailUsuario', sourceKey: 'email' });
Review.belongsTo(User, { foreignKey: 'EmailUsuario', targetKey: 'email' });
class GasolineraModelo {
    dailyUpdate(ListaEESSPrecio, cb) {
        Gasolinera.destroy({ where: {} })
            .then(() => {
                Gasolinera.bulkCreate(ListaEESSPrecio).then((result) => {
                    return cb(null, result);
                }).error((err) => {
                    return cb(err);
                })
            }).error((err) => {
                return cb(err);
            })
    }

    getAll(tipo, cb) {
        Gasolinera.findAll({
            where: {
                [tipo]: {
                    [Op.ne]: ""
                }
            }, attributes: ['Rótulo', 'Horario', 'Dirección', 'Latitud', 'Longitud (WGS84)', tipo]
        }).then((result) => {
            return cb(null, result);
        }).error((err) => {
            return cb(err);
        })
    }

    saveReview(review, cb) {
        Review.create(review).then((result) => {
            return cb(null, result);
        }).error((error) => {
            return cb(error);
        })
    }

    getReviewsByFuelStation(direccion, cb) {
        Review.findAll({ where: { DireccionGasolinera: direccion, Activa: true } }).then((result) => {
            return cb(null, result);
        })
            .error((error) => {
                return cb(error);
            })
    }

    getReviewsByUser(email, cb) {
        Review.findAll({ where: { EmailUsuario: email } }).then((result) => {
            return cb(null, result);
        })
            .error((error) => {
                return cb(error);
            })
    }


    getPendingReviews(cb) {
        Review.findAll({ where: { Activa: false } }).then((result) => {
            return cb(null, result);
        })
            .error((error) => {
                return cb(error);
            })
    }

    validateAll(reviews, cb) {
        let contador = 0;
        reviews.forEach((review) => {
            review.Activa = true;
            Review.update(review, { where: { id: review.id } }).then((result) => {
                contador++;
                if (contador == reviews.length) {
                    return cb(null, "Todo OK");
                }
            })
                .error((error) => {
                    return cb(error);
                })
        })

    };

    saveFavourites(favourites, cb) {
        let promises = favourites.map((fuelstation) => {
            return Favoritos.findOrCreate({
                where: {
                    'Tipo':fuelstation['Tipo'],
                    'Dirección':fuelstation['Dirección'],
                    'EmailUsuario':fuelstation['EmailUsuario']
                },
                defaults:{
                    'Latitud':fuelstation['Latitud'],
                    'Longitud (WGS84)':fuelstation['Longitud (WGS84)'],
                    'Rótulo':fuelstation['Rótulo'],
                    'Horario':fuelstation['Horario'],
                    'Precio':fuelstation['Precio'],
                }
            })
        });

        Promise.all(promises).then((favouritesAux)=>{
            return cb(null,favouritesAux);
        })
    }
}

module.exports = GasolineraModelo;