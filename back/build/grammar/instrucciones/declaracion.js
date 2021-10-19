"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipoInstruccion = 'declaracion';
        this.id = id;
        this.value = value;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        const val = this.value.ejecutar(environment);
        environment.guardar(this.id, val.valor, val.tipo);
    }
}
exports.Declaracion = Declaracion;
