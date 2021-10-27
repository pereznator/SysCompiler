"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class ToUpper extends expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipoExpresion = 'toupper';
    }
    ejecutar(env) {
        console.log('Ejecutando toupper');
        const val = this.expresion.ejecutar(env);
        if (val.tipo === retorno_1.Tipo.STRING) {
            return { valor: String(val.valor).toUpperCase(), tipo: retorno_1.Tipo.STRING };
        }
        else {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se pudo convertir a minusculas');
        }
    }
}
exports.ToUpper = ToUpper;
