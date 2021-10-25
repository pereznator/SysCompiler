"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class Declaracion extends instruccion_1.Instruccion {
    constructor(tipo, id, value, line, column) {
        super(line, column);
        this.tipoInstruccion = 'declaracion';
        this.id = id;
        this.value = value;
        this.tipo = tipo;
    }
    ejecutar(environment) {
        console.log('ejecutando declaracion');
        if (this.value !== null) {
            const val = this.value.ejecutar(environment);
            if (this.tipo !== val.tipo) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No coinciden los valores para declaracion de ${this.id}`);
            }
            return environment.guardar(this.id, val.valor, val.tipo);
        }
        environment.guardar(this.id, null, this.tipo);
    }
}
exports.Declaracion = Declaracion;
