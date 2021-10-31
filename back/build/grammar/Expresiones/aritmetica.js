"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
const acceso_1 = require("./acceso");
var OperacionAritmetica;
(function (OperacionAritmetica) {
    OperacionAritmetica[OperacionAritmetica["SUMA"] = 0] = "SUMA";
    OperacionAritmetica[OperacionAritmetica["RESTA"] = 1] = "RESTA";
    OperacionAritmetica[OperacionAritmetica["MULTI"] = 2] = "MULTI";
    OperacionAritmetica[OperacionAritmetica["DIV"] = 3] = "DIV";
    OperacionAritmetica[OperacionAritmetica["POT"] = 4] = "POT";
    OperacionAritmetica[OperacionAritmetica["MOD"] = 5] = "MOD";
    OperacionAritmetica[OperacionAritmetica["NEG"] = 6] = "NEG";
})(OperacionAritmetica = exports.OperacionAritmetica || (exports.OperacionAritmetica = {}));
class Aritmetica extends expresion_1.Expresion {
    constructor(left, right, type, linea, columna) {
        super(linea, columna);
        this.left = left;
        this.right = right;
        this.type = type;
        this.tipoExpresion = 'aritmetica';
    }
    ejecutar(environment) {
        console.log('Ejecutando aritmetica');
        const rightValue = this.verTipoVariable(this.right, environment);
        let leftValue;
        if (this.left) {
            leftValue = this.verTipoVariable(this.left, environment);
        }
        else {
            leftValue = rightValue;
        }
        let result;
        if (!rightValue || !leftValue) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'Error en la aritmetica.');
        }
        if (rightValue.tipo === retorno_1.Tipo.CHAR && (leftValue.tipo === retorno_1.Tipo.INT || leftValue.tipo === retorno_1.Tipo.DOUBLE)) {
            rightValue.valor = rightValue.valor.charCodeAt(0);
        }
        if (leftValue.tipo === retorno_1.Tipo.CHAR && (rightValue.tipo === retorno_1.Tipo.INT || rightValue.tipo === retorno_1.Tipo.DOUBLE)) {
            leftValue.valor = leftValue.valor.charCodeAt(0);
        }
        let tipoDominante;
        if (this.type == OperacionAritmetica.SUMA) {
            tipoDominante = this.tipoDominante(leftValue.tipo, rightValue.tipo);
            if (tipoDominante == retorno_1.Tipo.STRING)
                result = { valor: (leftValue.valor.toString() + rightValue.valor.toString()), tipo: retorno_1.Tipo.STRING };
            else if (tipoDominante == retorno_1.Tipo.INT || tipoDominante == retorno_1.Tipo.DOUBLE)
                result = { valor: (leftValue.valor + rightValue.valor), tipo: tipoDominante };
            else
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);
        }
        else if (this.type == OperacionAritmetica.RESTA) {
            tipoDominante = this.tipoDominanteResta(leftValue.tipo, rightValue.tipo);
            if (tipoDominante !== retorno_1.Tipo.INT && tipoDominante !== retorno_1.Tipo.DOUBLE)
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se puede operar: ' + leftValue.tipo + ' _ ' + rightValue.tipo);
            result = { valor: (leftValue.valor - rightValue.valor), tipo: tipoDominante };
        }
        else if (this.type == OperacionAritmetica.MULTI) {
            tipoDominante = this.tipoDominanteMulti(leftValue.tipo, rightValue.tipo);
            if (tipoDominante === retorno_1.Tipo.NULL) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede operar tipo ${leftValue.tipo} con ${rightValue.tipo}`);
            }
            result = { valor: (leftValue.valor * rightValue.valor), tipo: tipoDominante };
        }
        else if (this.type == OperacionAritmetica.DIV) {
            if (rightValue.valor == 0) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            tipoDominante = this.tipoDominanteMulti(leftValue.tipo, rightValue.tipo);
            if (tipoDominante === retorno_1.Tipo.NULL) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede operar tipo ${leftValue.tipo} con ${rightValue.tipo}`);
            }
            result = { valor: (leftValue.valor / rightValue.valor), tipo: retorno_1.Tipo.DOUBLE };
        }
        else if (this.type == OperacionAritmetica.POT) {
            tipoDominante = this.tipoDominantePotencia(leftValue.tipo, rightValue.tipo);
            if (tipoDominante === retorno_1.Tipo.NULL) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", `No se puede elevar ${leftValue.valor} con ${rightValue.valor}`);
            }
            result = { valor: (Math.pow(leftValue.valor, rightValue.valor)), tipo: tipoDominante };
        }
        else if (this.type == OperacionAritmetica.NEG) {
            if (rightValue.tipo !== retorno_1.Tipo.INT && rightValue.tipo !== retorno_1.Tipo.DOUBLE) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", `No se negar la expresion ${rightValue.valor}`);
            }
            result = { valor: -rightValue.valor, tipo: rightValue.tipo };
        }
        else {
            tipoDominante = this.tipoDominantePotencia(leftValue.tipo, rightValue.tipo);
            if (rightValue.valor == 0) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", "No se puede dividir entre 0");
            }
            if (tipoDominante === retorno_1.Tipo.NULL) {
                throw new error_1.Error_(this.linea, this.columna, "Semantico", `No se puede dividir ${leftValue.valor} entre ${rightValue.valor}`);
            }
            result = { valor: (leftValue.valor % rightValue.valor), tipo: tipoDominante };
        }
        return result;
    }
    verTipoVariable(variable, entorno) {
        if (variable instanceof acceso_1.Acceso) {
            const val = entorno.getVar(variable.id);
            if (val !== undefined && val !== null) {
                return { valor: val.valor, tipo: val.tipo };
            }
        }
        else if (variable instanceof expresion_1.Expresion) {
            return variable.ejecutar(entorno);
        }
        return null;
    }
}
exports.Aritmetica = Aritmetica;
