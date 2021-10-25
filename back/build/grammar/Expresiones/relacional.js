"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
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
        this.tiopExpresion = 'relacional';
    }
    ejecutar(environment) {
        console.log('ejecutando relacional');
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
        else {
            if ((leftValue.tipo !== retorno_1.Tipo.DOUBLE && leftValue.tipo !== retorno_1.Tipo.INT && leftValue.tipo !== retorno_1.Tipo.CHAR)
                || (rightValue.tipo !== retorno_1.Tipo.DOUBLE && rightValue.tipo !== retorno_1.Tipo.INT && rightValue.tipo !== retorno_1.Tipo.CHAR)) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No son compatibles los tipos de ${leftValue.valor} y  ${rightValue.valor} para comparar.`);
            }
            if (leftValue.tipo == retorno_1.Tipo.CHAR) {
                leftValue.valor = leftValue.valor.charCodeAt(0);
            }
            if (rightValue.tipo == retorno_1.Tipo.CHAR) {
                rightValue.valor = rightValue.valor.charCodeAt(0);
            }
            if (this.type == OpcionRelacional.MAYOR) {
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
        }
        return { valor: 0, tipo: retorno_1.Tipo.INT };
    }
}
exports.Relacional = Relacional;
