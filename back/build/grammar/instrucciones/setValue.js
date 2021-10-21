"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../Error/error");
const instruccion_1 = require("../abstractas/instruccion");
class SetValue extends instruccion_1.Instruccion {
    constructor(id, posicion, valor, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.valor = valor;
        this.tipoInstruccion = 'setvalue';
    }
    ejecutar(env) {
        const pos = this.posicion.ejecutar(env);
        const valor = this.valor.ejecutar(env);
        const dym = env.getDynamicList(this.id);
        if (dym) {
            dym.elementos[pos.valor] = valor.valor;
            return;
        }
        throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
    }
}
exports.SetValue = SetValue;
