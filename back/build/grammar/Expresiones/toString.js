"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
class ToString extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipoExpresion = 'tostring';
    }
    ejecutar(env) {
        const val = this.valor.ejecutar(env);
        return { valor: `${val.valor}`, tipo: retorno_1.Tipo.STRING };
    }
}
exports.ToString = ToString;
