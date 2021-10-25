"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class Asignacion extends instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipoInstruccion = 'asignacion';
        this.id = id;
        this.value = value;
    }
    ejecutar(environment) {
        const val = this.value.ejecutar(environment);
        const varaible = environment.getVar(this.id);
        if (!varaible) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable con id '${this.id}'`);
        }
        if (val.tipo !== varaible.tipo) {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `Variable '${this.id}' debe ser de tipo ${varaible.tipo}`);
        }
        environment.guardar(this.id, val.valor, val.tipo);
    }
}
exports.Asignacion = Asignacion;
