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
        field:'PrecioBiodiesel'
    },
    'Precio Bioetanol':{
        type:SEQUELIZE.STRING,
        field:'PrecioBioetanol'
    },
    'Precio Gas Natural Comprimido':{
        type:SEQUELIZE.STRING,
        field:'PrecioGasNaturalComprimido'
    },
    'Precio Gas Natural Licuado':{
        type:SEQUELIZE.STRING,
        field:'PrecioGasNaturalLicuado'
    },
    'Precio Gases licuados del petróleo':{
        type:SEQUELIZE.STRING,
        field:'PrecioGaseslicuadosdelpetróleo'
    },
    'Precio Gasoleo A':{
        type:SEQUELIZE.STRING,
        field:'PrecioGasoleoA'
    },
    'Precio Gasoleo B':{
        type:SEQUELIZE.STRING,
        field:'PrecioGasoleoB'
    },
    'Precio Gasolina 95 Protección':{
        type:SEQUELIZE.STRING,
        field:'PrecioGasolina95Protección'
    },
    'Precio Gasolina  98':{
        type:SEQUELIZE.STRING,
        field:'PrecioGasolina98'
    },
    'Precio Nuevo Gasoleo A':{
        type:SEQUELIZE.STRING,
        field:'PrecioNuevoGasoleoA'
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
            Gasolinera.findAll({limit:10,where:{
                    [tipo]:{
                    [Op.ne]:""
                    }
                }
            }).then((result)=>{
                return cb(null,result);
            }).error((err)=>{
                return cb(err);
            })
    }
}

module.exports = GasolineraModelo;