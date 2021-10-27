"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class TypeOf extends expresion_1.Expresion {
    constructor(valor, linea, columna) {
        super(linea, columna);
        this.valor = valor;
        this.tipoExpresion = 'typeof';
    }
    ejecutar(env) {
        console.log('Ejecutando typeof');
        const val = this.valor.ejecutar(env);
        if (val.tipo === retorno_1.Tipo.INT) {
            return { valor: 'int', tipo: retorno_1.Tipo.STRING };
        }
        else if (val.tipo === retorno_1.Tipo.DOUBLE) {
            return { valor: 'double', tipo: retorno_1.Tipo.STRING };
        }
        else if (val.tipo === retorno_1.Tipo.STRING) {
            return { valor: 'string', tipo: retorno_1.Tipo.STRING };
        }
        else if (val.tipo === retorno_1.Tipo.CHAR) {
            return { valor: 'char', tipo: retorno_1.Tipo.STRING };
        }
        else if (val.tipo === retorno_1.Tipo.BOOLEAN) {
            return { valor: 'boolean', tipo: retorno_1.Tipo.STRING };
        }
        else if (val.tipo === retorno_1.Tipo.ARRAY) {
            return { valor: 'array', tipo: retorno_1.Tipo.STRING };
        }
        throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se encontro tipo para la variable ' + val.valor);
    }
}
exports.TypeOf = TypeOf;
