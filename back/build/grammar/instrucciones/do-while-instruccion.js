"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const retorno_1 = require("../abstractas/retorno");
const statement_1 = require("./statement");
class DoWhileInstruccion extends instruccion_1.Instruccion {
    constructor(condition, code, linea, columna) {
        super(linea, columna);
        this.condition = condition;
        this.code = code;
        this.tipoInstruccion = 'dowhile';
    }
    ejecutar(env) {
        console.log('Ejecutando dowhile');
        let condition = this.condition.ejecutar(env);
        if (condition.tipo != retorno_1.Tipo.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.linea, columna: this.columna };
        }
        if (this.code instanceof statement_1.Statement) {
            this.code.nombreEntorno = 'instruccion do while';
        }
        let element = this.code.ejecutar(env);
        if (element != null || element != undefined) {
            if (element.valor) {
                console.log('[element]' + element);
                return element;
            }
            if (element.tipoInstruccion == 'break')
                return;
            else if (element.tipoInstruccion == 'continue') {
                condition = this.condition.ejecutar(env);
                return;
            }
            else if (element.tipoInstruccion == 'return') {
                return;
            }
            else
                return element;
        }
        while (condition.valor == true) {
            element = this.code.ejecutar(env);
            if (element != null || element != undefined) {
                if (element.valor) {
                    console.log('[element]' + element);
                    return element;
                }
                if (element.tipoInstruccion == 'break')
                    break;
                else if (element.tipoInstruccion == 'continue') {
                    condition = this.condition.ejecutar(env);
                    continue;
                }
                else if (element.tipoInstruccion == 'return') {
                    return element;
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
