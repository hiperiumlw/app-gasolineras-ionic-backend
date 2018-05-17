var bcrypt = require('bcrypt-nodejs');
const UsersModel = require('../models/usersModel');

class UsersController{
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
        this.usersModel = new UsersModel();
    }

    login(){

    }

    register(){
        var hash = bcrypt.hashSync(this.req.body.password);
        var usuario = {
            name: this.req.body.name,
            email: this.req.body.email,
            password: hash,
            isAdmin: 0,
            active: 1
        };
        this.usersModel.register(usuario,(error,resultado)=>{
            if (error) {
               this.res.status(500).json({success:false,message:{error}});
            } else {
                switch (resultado) {
                    case 1:
                        this.res.status(404).json({success:false,message:'El email ya existe, intentelo de nuevo!'})
                        break;
                    case 2:
                        this.res.status(200).json({success:true,message:'Se ha registrado correctamente! Ahora puede iniciar sesión'})
                        break;
                }
            }
        });  
    }
}

module.exports = UsersController;