"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
var OperacionAritmetica;
(function (OperacionAritmetica) {
    OperacionAritmetica[OperacionAritmetica["SUMA"] = 0] = "SUMA";
    OperacionAritmetica[OperacionAritmetica["RESTA"] = 1] = "RESTA";
    OperacionAritmetica[OperacionAritmetica["MULTI"] = 2] = "MULTI";
    OperacionAritmetica[OperacionAritmetica["DIV"] = 3] = "DIV";
    OperacionAritmetica[OperacionAritmetica["POT"] = 4] = "POT";
    OperacionAritmetica[OperacionAritmetica["MOD"] = 5] = "MOD";
})(OperacionAritmetica = exports.OperacionAritmetica || (exports.OperacionAritmetica = {}));
class Aritmetica extends expresion_1.Expresion {
    constructor(left, right, type, linea, columna) {
        super(linea, columna);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    ejecutar(environment) {
        const leftValue = this.left.ejecutar(environment);
        const rightValue = this.right.ejecutar(environment);
        let result;
        const tipoDominante = this.tipoDominante(leftValue.tipo, rightValue.tipo);
        if (this.type == OperacionAritmetica.SUMA) {
            if (tipoDominante == retorno_1.Tipo.STRING)
                result = { valor: (leftValue.valor.toString() + rightValue.valor.toString()), tipo: retorno_1.Tipo.STRING };
            else if (tipoDominante == retorno_1.Tipo.INT)
                result = { valor: (leftValue.valor + rightValue.valor), tipo: retorno_1.Tipo.INT };
            else
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);
        }
        else if (this.type == OperacionAritmetica.RESTA) {
            if (tipoDominante == retorno_1.Tipo.STRING)
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);
            result = { valor: (leftValue.valor - rightValue.valor), tipo: retorno_1.Tipo.INT };
        }
        else if (this.type == OperacionAritmetica.MULTI) {
            result = { valor: (leftValue.valor * rightValue.valor), tipo: retorno_1.Tipo.INT };
        }
        else if (this.type == OperacionAritmetica.DIV) {
            if (rightValue.valor == 0) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            result = { valor: (leftValue.valor / rightValue.valor), tipo: retorno_1.Tipo.INT };
        }
        else if (this.type == OperacionAritmetica.POT) {
            if (tipoDominante != retorno_1.Tipo.INT && tipoDominante != retorno_1.Tipo.DOBULE) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", "No se puede elevar con valores no numeros");
            }
            result = { valor: (Math.pow(leftValue.valor, rightValue.valor)), tipo: retorno_1.Tipo.DOBULE };
        }
        else {
            if (rightValue.valor == 0) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            result = { valor: (leftValue.valor % rightValue.valor), tipo: retorno_1.Tipo.INT };
        }
        return result;
    }
}
exports.Aritmetica = Aritmetica;
