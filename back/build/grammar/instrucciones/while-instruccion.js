"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class WhileInstruccion extends instruccion_1.Instruccion {
    constructor(condition, code, linea, columna) {
        super(linea, columna);
        this.condition = condition;
        this.code = code;
        this.tipoInstruccion = 'while';
    }
    ejecutar(env) {
        console.log('ejecutando while');
        let condition = this.condition.ejecutar(env);
        if (condition.tipo != retorno_1.Tipo.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.linea, columna: this.columna };
        }
        while (condition.valor == true) {
            const element = this.code.ejecutar(env);
            if (element != null && element != undefined) {
                if (element.tipoInstruccion == 'break') {
                    break;
                }
                else if (element.tipoInstruccion == 'continue') {
                    condition = this.condition.ejecutar(env);
                    continue;
                }
                else if (element.tipoInstruccion == 'return') {
                    break;
                }
                else {
                    return element;
                }
            }
            condition = this.condition.ejecutar(env);
            if (condition.tipo != retorno_1.Tipo.BOOLEAN) {
                throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se`);
            }
        }
    }
}
exports.WhileInstruccion = WhileInstruccion;
