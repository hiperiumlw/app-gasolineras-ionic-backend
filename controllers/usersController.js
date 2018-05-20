var bcrypt = require('bcrypt-nodejs');
const UsersModel = require('../models/usersModel');
let passport = require('../helpers/passport');
class UsersController {
    constructor() {
        this.usersModel = new UsersModel();
    }

    login(req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                console.log(err);
                res.status(500).json({ success: false, message: err })
            }
            if (!user) {
                console.log(info);
                res.status(400).json({ success: false, message: info.message })
            }
            //this.res.status(200).json({success:true,message:'Ha iniciado sesión correctamente!'})
            req.logIn(user, function (err) {
                if (err) { res.status(400).json({ success: false, message: err }) }
                res.status(200).json({ success: true, message: 'Ha iniciado sesión correctamente', user: user });
            });
        })(req, res, next);
    }

    register(req, res, next) {
        var hash = bcrypt.hashSync(req.body.password);
        var usuario = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            isAdmin: 0,
            active: 1
        };
        this.usersModel.register(usuario, (error, resultado) => {
            if (error) {
                res.status(500).json({ success: false, message: { error } });
            } else {
                switch (resultado) {
                    case 1:
                        res.status(400).json({ success: false, message: 'El email ya existe, intentelo de nuevo!' })
                        break;
                    case 2:
                        res.status(200).json({ success: true, message: 'Se ha registrado correctamente! Ahora puede iniciar sesión.' })
                        break;
                }
            }
        });
    }
}

module.exports = UsersController;