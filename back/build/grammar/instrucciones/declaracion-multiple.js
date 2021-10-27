"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class DeclaracionMultiple extends instruccion_1.Instruccion {
    constructor(tipo, ids, value, line, column) {
        super(line, column);
        this.declaracion = 'declaracion multiple';
        this.ids = ids;
        this.value = value;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        const val = this.value.ejecutar(environment);
        if (this.tipo !== val.tipo) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se puede asignar tipo ${val.tipo} a ${this.tipo}`);
        }
        for (const id of this.ids) {
            environment.guardar(id, val.valor, val.tipo);
        }
    }
}
exports.DeclaracionMultiple = DeclaracionMultiple;
