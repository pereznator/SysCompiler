"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Length extends expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipoExpresion = 'length';
    }
    ejecutar(env) {
        console.log('Ejecutando length');
        const val = this.expresion.ejecutar(env);
        if (val.tipo === retorno_1.Tipo.STRING) {
            return { valor: val.valor.length, tipo: retorno_1.Tipo.INT };
        }
        else if (val.tipo === retorno_1.Tipo.ARRAY) {
            return { valor: val.valor.elementos.length, tipo: retorno_1.Tipo.INT };
        }
        throw new error_1.Error_(this.linea, this.columna, 'Sintactico', 'No se puede encontrar la longitud de ' + val.valor);
    }
}
exports.Length = Length;
