"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
class IfInstruccion extends instruccion_1.Instruccion {
    constructor(condicion, contenido, insElse, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.contenido = contenido;
        this.insElse = insElse;
        this.tipoInstruccion = 'if';
    }
    ejecutar(ent) {
        console.log('ejecutando if');
        const condicion = this.condicion.ejecutar(ent);
        if (condicion.tipo != retorno_1.Tipo.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.linea, columna: this.columna };
        }
        if (condicion.valor == true) {
            return this.contenido.ejecutar(ent);
        }
        else {
            if (this.insElse) {
                return this.insElse.ejecutar(ent);
            }
        }
    }
}
exports.IfInstruccion = IfInstruccion;
