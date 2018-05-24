const ApiModel = require('../models/apiModel');
let request = require('request');
class ApiController {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.apiModel = new ApiModel();
    }


    dailyUpdate() {
        request('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/',
            { json: true }, (err, response, body) => {
                if (err) this.res.send.statusCode(500).json(err);
                this.apiModel.dailyUpdate(body.ListaEESSPrecio, (err, result) => {
                    if (err) console.log("Error -> " + err);
                    else {
                        this.res.statusCode = 200;
                        this.res.send("OK");
                    }
                })
            })
    }

    getFuelStation() {
        let tipo = decodeURI(this.req.params.tipo);
        this.apiModel.getAll(decodeURI(tipo), (err, result) => {
            if (err) this.res.statusCode(500).send(err);
            else {
                let markers = [];
                result.forEach((data) => {
                    markers.push({
                        position: {
                            lat: parseFloat((data['Latitud']).replace(',', '.')),
                            lng: parseFloat((data['Longitud (WGS84)']).replace(',', '.'))
                        },
                        name: data['Rótulo'],
                        schedule: data['Horario'],
                        price:parseFloat((data[tipo]).replace(',', '.')),
                        address:data['Dirección']
                    })
                });
                this.res.send(markers);
            }
        })
    }

    saveReview(){
        let review = {
            Comentario:this.req.body.Comentario,
            Puntuacion:this.req.body.Puntuacion,
            DireccionGasolinera:this.req.body.DireccionGasolinera
        }
        this.apiModel.saveReview(review,(err,result)=>{
            if (err) this.res.statusCode(500).send(err);
            else this.res.status(200).json({success:true,message:'Ha creado una review que será revisada por un administrador...'});
        })
    }

    getReviews(){
        let direccion = decodeURIComponent(this.req.params.direccion);
        this.apiModel.getReviews(direccion,(err,result)=>{
            if (err) this.res.statusCode(500).send(err);
            else {
                this.res.send(result);
            }
        })
    }

}



module.exports = ApiController;