"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
class DoWhileInstruccion extends instruccion_1.Instruccion {
    constructor(condition, code, linea, columna) {
        super(linea, columna);
        this.condition = condition;
        this.code = code;
        this.tipoInstruccion = 'dowhile';
    }
    ejecutar(env) {
        let condition = this.condition.ejecutar(env);
        if (condition.tipo != retorno_1.Tipo.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.linea, columna: this.columna };
        }
        while (condition.valor == true) {
            const element = this.code.ejecutar(env);
            if (element != null || element != undefined) {
                console.log(element);
                if (element.type == 'Break')
                    break;
                else if (element.type == 'Continue') {
                    condition = this.condition.ejecutar(env);
                    continue;
                }
                else
                    return element;
            }
            condition = this.condition.ejecutar(env);
            if (condition.tipo != retorno_1.Tipo.BOOLEAN) {
                throw { error: "La condicion no es booleana", linea: this.linea, columna: this.columna };
            }
        }
    }
}
exports.DoWhileInstruccion = DoWhileInstruccion;
