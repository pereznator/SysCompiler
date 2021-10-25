"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class WriteLine extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipoInstruccion = 'writeline';
    }
    ejecutar(env) {
        console.log('Ejecutando writeline');
        try {
            const exp = this.expresion.ejecutar(env);
            console.log(exp);
        }
        catch (err) {
            console.log(err);
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', 'No se pudo ejecutar writeline.');
        }
    }
}
exports.WriteLine = WriteLine;
