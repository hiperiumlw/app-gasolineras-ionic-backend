const ApiModel = require('../models/apiModel');
let request = require('request');

class ApiController {
    constructor(req,res,next){
        this.req = req;
        this.res = res;
        this.next = next;
        this.apiModel = new ApiModel();
    }


    dailyUpdate(){
        request('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/',
            {json:true},(err,response,body)=>{
                if (err) this.res.send.statusCode(500).json(err);
                this.apiModel.dailyUpdate(body.ListaEESSPrecio,(err,result)=>{
                    if (err) console.log("Error -> " + err);
                    else {
                        this.res.statusCode = 200;
                        this.res.send("OK");
                    };
                })
            })
    }

    getFuelStation(){
        this.apiModel.getAll(this.req.params.tipo,(err,result)=>{
            if (err) this.res.statusCode(500).send(err);
            else {
                this.res.send(result);
            }
        })
    }
}



module.exports = ApiController;