"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class AccesoVector extends expresion_1.Expresion {
    constructor(id, posicion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.tipoInstruccion = 'acceso vector';
    }
    ejecutar(env) {
        const val = this.posicion.ejecutar(env);
        if (val.tipo !== retorno_1.Tipo.INT) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Solo se puede acceder a posiciones del vector ${this.id} con valores enteros.`);
        }
        const vector = env.getVector(this.id);
        if (!vector) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro el vector con id '${this.id}'.`);
        }
        if (vector.elementos.length - 1 < val.valor || val.valor < 0) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No existe la posicion ${val.valor} en el vector '${this.id}'.`);
        }
        return vector.elementos[val.valor];
    }
}
exports.AccesoVector = AccesoVector;
