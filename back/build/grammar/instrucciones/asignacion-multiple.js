"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class AsignacionMultiple extends instruccion_1.Instruccion {
    constructor(ids, value, line, column) {
        super(line, column);
        this.declaracion = 'asignacion multiple';
        this.ids = ids;
        this.value = value;
    }
    ejecutar(environment) {
        const val = this.value.ejecutar(environment);
        if (!val) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se pudo asignar valor a las variables`);
        }
        for (const id of this.ids) {
            const variable = environment.getVar(id);
            if (!variable) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro variable con id '${id}'.`);
            }
            if (variable.tipo !== val.tipo) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se pude asignar tipo ${val.tipo} a '${id}'.`);
            }
            environment.guardar(id, val.valor, val.tipo);
        }
    }
}
exports.AsignacionMultiple = AsignacionMultiple;
