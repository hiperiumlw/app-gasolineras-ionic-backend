let sequelize = require('../connection/sequelizeconnection');
const SEQUELIZE = require('sequelize');
const Op = SEQUELIZE.Op;

const Gasolinera = sequelize.define('gasolineras',{
    'Rótulo':{
        type:SEQUELIZE.STRING
    },
    'Horario':{
        type:SEQUELIZE.STRING
    },
    'Latitud':{
        type:SEQUELIZE.STRING
    },
    'Longitud (WGS84)':{
        type:SEQUELIZE.STRING
    },
    'Precio Biodiesel':{
        type:SEQUELIZE.STRING,
    },
    'Precio Bioetanol':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gas Natural Comprimido':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gas Natural Licuado':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gases licuados del petróleo':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gasoleo A':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gasoleo B':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gasolina 95 Protección':{
        type:SEQUELIZE.STRING,
    },
    'Precio Gasolina  98':{
        type:SEQUELIZE.STRING,
    },
    'Precio Nuevo Gasoleo A':{
        type:SEQUELIZE.STRING,
    },

})

class GasolineraModelo{
    dailyUpdate(ListaEESSPrecio,cb){
        Gasolinera.destroy({where:{}})
            .then(()=>{
            Gasolinera.bulkCreate(ListaEESSPrecio).then((result)=>{
                return cb(null,result);
                }).error((err)=>{
                    return cb(err);
                })
        }).error((err)=>{
            return cb(err);
        })
    }

    getAll(tipo,cb){
            Gasolinera.findAll({where:{
                    [tipo]:{
                    [Op.ne]:""
                    }
                },attributes:['Rótulo','Horario','Latitud','Longitud (WGS84)',tipo]
            }).then((result)=>{
                return cb(null,result);
            }).error((err)=>{
                return cb(err);
            })
    }
}

module.exports = GasolineraModelo;