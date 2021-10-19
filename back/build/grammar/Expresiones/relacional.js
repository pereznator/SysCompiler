"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
var OpcionRelacional;
(function (OpcionRelacional) {
    OpcionRelacional[OpcionRelacional["IGUAL"] = 0] = "IGUAL";
    OpcionRelacional[OpcionRelacional["DESIGUAL"] = 1] = "DESIGUAL";
    OpcionRelacional[OpcionRelacional["MENOR"] = 2] = "MENOR";
    OpcionRelacional[OpcionRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    OpcionRelacional[OpcionRelacional["MAYOR"] = 4] = "MAYOR";
    OpcionRelacional[OpcionRelacional["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(OpcionRelacional = exports.OpcionRelacional || (exports.OpcionRelacional = {}));
class Relacional extends expresion_1.Expresion {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    ejecutar(environment) {
        const leftValue = this.left.ejecutar(environment);
        const rightValue = this.right.ejecutar(environment);
        if (this.type == OpcionRelacional.IGUAL) {
            const result = leftValue.valor == rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OpcionRelacional.DESIGUAL) {
            const result = leftValue.valor != rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OpcionRelacional.MAYOR) {
            const result = leftValue.valor > rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OpcionRelacional.MAYORIGUAL) {
            const result = leftValue.valor >= rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OpcionRelacional.MENOR) {
            const result = leftValue.valor < rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        else if (this.type == OpcionRelacional.MENORIGUAL) {
            const result = leftValue.valor <= rightValue.valor;
            return { valor: result, tipo: retorno_1.Tipo.BOOLEAN };
        }
        return { valor: 0, tipo: retorno_1.Tipo.INT };
    }
}
exports.Relacional = Relacional;
