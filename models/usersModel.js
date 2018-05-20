let sequelize = require('../connection/sequelizeconnection');
const SEQUELIZE = require('sequelize');

const User = sequelize.define('usuarios', {
    name: {
        type: SEQUELIZE.STRING
    },
    email: {
        type: SEQUELIZE.STRING
    },
    password: {
        type: SEQUELIZE.STRING
    },
    isAdmin: {
        type: SEQUELIZE.BOOLEAN
    },
    active: {
        type: SEQUELIZE.BOOLEAN
    },
    imagen: {
        type: SEQUELIZE.STRING
    }
})

class UsersModel {
    login(usuario, cb) {
        User.findOne({ where: { email: usuario.email } }).then((user) => {
            return cb(null, user);
        }).error((error) => {
            return cb(error);
        })
    }

    getUserById(id, cb) {
        User.findOne({ where: { id: id } }).then((resultado) => {
            return cb(null, resultado);
        }).error((error) => {
            return cb(error);
        })
    }

    register(usuario, cb) {
        let comprobacion = [1, 2];
        User.findOne({ where: { email: usuario.email } }).then((resultado) => {
            if (resultado) return cb(null, comprobacion[0]);
            else
                User.create(usuario).then((resultado) => {
                    return cb(null, comprobacion[1]);
                })
        }).error((err) => {
            return cb(err);
        })
    }
}

module.exports = UsersModel;


