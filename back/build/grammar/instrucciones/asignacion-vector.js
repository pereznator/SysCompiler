"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
const retorno_1 = require("../abstractas/retorno");
class AsignacionVector extends instruccion_1.Instruccion {
    constructor(id, posicion, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.valor = valor;
        this.tipoInstruccion = 'asignacion vector';
    }
    ejecutar(env) {
        const vec = env.getVector(this.id);
        if (!vec) {
            throw new error_1.Error_(this.linea, this.columna, 'Sintactico', 'No se encontro el vector.');
        }
        const pos = this.posicion.ejecutar(env);
        if (pos.tipo !== retorno_1.Tipo.INT) {
            throw new error_1.Error_(this.linea, this.columna, 'Sintactico', 'Posicion invalida.');
        }
        if (vec.elementos.length - 1 < pos.valor) {
            throw new error_1.Error_(this.linea, this.columna, 'Sintactico', 'Posicion supera el indice.');
        }
        if (typeof this.valor == 'string') {
        }
        const val = this.valor.ejecutar(env);
        if (val.tipo !== vec.tipo) {
            throw new error_1.Error_(this.linea, this.columna, 'Sintactico', `No coinciden los tipos de datos para asignar al vector ${vec.id}.`);
        }
        vec.elementos[Number(pos.valor)] = val;
    }
}
exports.AsignacionVector = AsignacionVector;
