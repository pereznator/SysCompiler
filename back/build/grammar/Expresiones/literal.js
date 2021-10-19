"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
class Literal extends expresion_1.Expresion {
    constructor(valor, linea, columna, tipo) {
        super(linea, columna);
        this.valor = valor;
        this.tipo = tipo;
    }
    ejecutar() {
        if (this.tipo == 0)
            return { valor: Number(this.valor), tipo: retorno_1.Tipo.INT };
        else if (this.tipo == 1)
            return { valor: Number(this.valor), tipo: retorno_1.Tipo.DOBULE };
        else if (this.tipo == 2)
            return { valor: this.valor, tipo: retorno_1.Tipo.STRING };
        else if (this.tipo == 3)
            return { valor: this.valor, tipo: retorno_1.Tipo.CHAR };
        else if (this.tipo == 4)
            return { valor: this.valor, tipo: retorno_1.Tipo.BOOLEAN };
        else
            return { valor: null, tipo: retorno_1.Tipo.NULL };
    }
}
exports.Literal = Literal;