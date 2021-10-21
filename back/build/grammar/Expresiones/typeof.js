"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
class TypeOf extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipoExpresion = 'typeof';
    }
    ejecutar(env) {
        const val = this.valor.ejecutar(env);
        return { valor: val.tipo, tipo: retorno_1.Tipo.STRING };
    }
}
exports.TypeOf = TypeOf;
