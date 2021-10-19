"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class ForInstruccion extends instruccion_1.Instruccion {
    constructor(inicio, condicion, actualizacion, contenido, linea, columna) {
        super(linea, columna);
        this.inicio = inicio;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.contenido = contenido;
        this.tipoInstruccion = 'for';
    }
    ejecutar(ent) {
        this.inicio.ejecutar(ent);
        const id = this.inicio.id;
        const condi = this.condicion.ejecutar(ent);
        if (condi.tipo != retorno_1.Tipo.BOOLEAN) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `La condicion ${condi.valor} no es booleana`);
        }
        /*const condicion = this.condicion.ejecutar(ent);
        if(condicion.tipo != Tipo.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }

        if(condicion.valor == true){
            return this.contenido.ejecutar(ent);
        }
        else{
            return this.insElse?.ejecutar(ent);
        }*/
    }
}
exports.ForInstruccion = ForInstruccion;
