"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class ToCharArray extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipoExpresion = 'tochararray';
    }
    ejecutar(env) {
        console.log('Ejecutando tochararray');
        const val = this.valor.ejecutar(env);
        if (val.tipo !== retorno_1.Tipo.STRING) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'CharArray solo puede recibir strings.');
        }
        let arr = new Array();
        for (let x = 0; x < val.valor.length; x++) {
            arr.push({ valor: val.valor[x], tipo: retorno_1.Tipo.CHAR });
        }
        return { valor: arr, tipo: retorno_1.Tipo.ARRAY };
    }
}
exports.ToCharArray = ToCharArray;
