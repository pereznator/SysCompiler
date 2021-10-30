"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
class SwitchInstruccion extends instruccion_1.Instruccion {
    constructor(expresion, cases, defa, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
        this.cases = cases;
        this.defa = defa;
        this.tipoInstruccion = 'switch';
    }
    ejecutar(env) {
        console.log('ejecutando switch');
        const valor = this.expresion.ejecutar(env);
        if (this.cases === null) {
            if (this.defa === null) {
                return;
            }
            this.defa.ejecutar(env);
            return;
        }
        let final;
        this.cases.forEach(c => {
            const result = c.ejecutar(env, valor);
            if (result !== null && result !== undefined) {
                if (result.tipoInstruccion == 'break') {
                    final = 'break';
                }
                else if (result.tipoInstruccion == 'return') {
                    final = 'return';
                }
                else if (result.tipoInstruccion == 'continue') {
                    final = 'continue';
                }
            }
        });
        if (!final) {
            console.log('no hubo break');
            this.defa.ejecutar(env);
        }
    }
}
exports.SwitchInstruccion = SwitchInstruccion;
