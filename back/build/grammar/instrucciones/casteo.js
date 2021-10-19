"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
class Casteo extends instruccion_1.Instruccion {
    constructor(tipo, expresion, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.expresion = expresion;
        this.tipoInstruccion = 'casteo';
    }
    ejecutar(env) {
        const val = this.expresion.ejecutar(env);
        let nuevoValor;
        if (this.tipo == retorno_1.Tipo.STRING) {
            nuevoValor = val.valor;
        }
        else if (this.tipo == retorno_1.Tipo.INT) {
            nuevoValor = val.valor;
        }
        else if (this.tipo == retorno_1.Tipo.DOBULE) {
            nuevoValor = val.valor;
        }
        else if (this.tipo == retorno_1.Tipo.BOOLEAN) {
            nuevoValor = val.valor;
        }
        else if (this.tipo == retorno_1.Tipo.CHAR) {
            nuevoValor = val.valor;
        }
        return nuevoValor;
    }
}
exports.Casteo = Casteo;
