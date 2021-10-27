"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class ToString extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipoExpresion = 'tostring';
    }
    ejecutar(env) {
        const val = this.valor.ejecutar(env);
        if (val.tipo !== retorno_1.Tipo.DOUBLE && val.tipo !== retorno_1.Tipo.INT && val.tipo !== retorno_1.Tipo.BOOLEAN && val.tipo !== retorno_1.Tipo.STRING) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede convertir a string tipo ${val.tipo}`);
        }
        return { valor: `${val.valor}`, tipo: retorno_1.Tipo.STRING };
    }
}
exports.ToString = ToString;
