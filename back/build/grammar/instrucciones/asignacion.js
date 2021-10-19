"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class Asignacion extends instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipoInstruccion = 'asignacion';
        this.id = id;
        this.value = value;
    }
    ejecutar(environment) {
        const val = this.value.ejecutar(environment);
        environment.guardar(this.id, val.valor, val.tipo);
    }
}
exports.Asignacion = Asignacion;
