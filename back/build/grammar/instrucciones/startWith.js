"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class StartWith extends instruccion_1.Instruccion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipoInstruccion = 'start with';
    }
    ejecutar(env) {
        console.log('Start with ejecutandose');
        return this.id.ejecutar(env);
    }
}
exports.StartWith = StartWith;
