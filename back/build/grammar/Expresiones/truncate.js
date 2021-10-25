"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Truncate extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipoExpresion = 'truncate';
    }
    ejecutar(env) {
        const val = this.valor.ejecutar(env);
        if (val.tipo !== retorno_1.Tipo.DOUBLE && val.tipo !== retorno_1.Tipo.INT) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'Truncate solo acepta valores numericos');
        }
        return { valor: Math.floor(val.valor), tipo: retorno_1.Tipo.INT };
    }
}
exports.Truncate = Truncate;
