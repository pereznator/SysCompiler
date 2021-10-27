"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class GetValue extends expresion_1.Expresion {
    constructor(id, posicion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.tipoExpresion = 'getvalue';
    }
    ejecutar(env) {
        console.log('Ejecutando getvalue');
        const dym = env.getDynamicList(this.id);
        if (!dym) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
        }
        const val = this.posicion.ejecutar(env);
        if (val.tipo !== retorno_1.Tipo.INT) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Para acceder a una posicion de '${this.id}' se necesita un valor entero.`);
        }
        if (dym.elementos.length - 1 < val.valor) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No existe la posicion ${val.valor} en la lista '${this.id}'.`);
        }
        return dym.elementos[val.valor];
    }
}
exports.GetValue = GetValue;
