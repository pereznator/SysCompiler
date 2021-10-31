"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class WriteLine extends instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.tipoInstruccion = 'writeline';
        this.salida = '';
    }
    ejecutar(env) {
        console.log('Ejecutando writeline');
        const exp = this.expresion.ejecutar(env);
        console.log(exp);
        this.salida = exp.valor.toString();
        env.getGlobal().salidas.push(this.salida);
    }
}
exports.WriteLine = WriteLine;
