const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UsersModel = require('../models/usersModel');
const bcrypt = require('bcrypt-nodejs');

//Passport - Inicio
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    let usersModel = new UsersModel();
    usersModel.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    //funcion para recibir los parametros de req,username,password y un callback
    function(username, password, done) {
        console.log("Entro aqui");
        let usersModel = new UsersModel();
        usersModel.login({ 'email' :  username },
            function(err, usuario) {
                // En caso de error, devolvemos el mismo con el done
                if (err)
                    return done(err);
                // El usuario no existe , registramos el error y nos redirigimos hacia atrás
                if (!usuario){
                    return done(null, false, {message:'El usuario no existe, intentelo de nuevo!'});
                }
                // El usuario existe pero la contraseña es incorrecta
                if (!comprobarPass(usuario, password)){
                    return done(null, false, {message:'La contraseña is incorrecta , intentelo de nuevo!'});
                }
                // Comprobamos si el usuario está activo o no
                if (!usuarioActivo(usuario)){
                    return done(null,false,{message:'Su cuenta no esta activa, revisa su correo para activarla'})
                }
                // Todo es correcto , el done nos devolvera un succes
                return done(null, usuario);
            }
        );
    }));

/*passport.use(new TwitterStrategy({
        consumerKey: 'yMYkuaTGezVf4KgGYNk0DU5xm',
        consumerSecret: 'FANMcCFGLZYJLxYZqSdcSefp8vJNT4tUreHm931vXeniOHcfDf',
        callbackURL: "http://localhost:3000/users/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
        User.findOrCreateTwitter(profile, function (err, user) {
             return cb(err, user);
         });
    }
));*/
let comprobarPass = (usuario,contraseña)=>{
    return bcrypt.compareSync(contraseña,usuario.password);
}

let usuarioActivo = (usuario)=>{
    return usuario.active;
}


module.exports = passport;