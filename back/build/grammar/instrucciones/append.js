"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruccion_1 = require("../abstractas/instruccion");
const error_1 = require("../Error/error");
class AppendInstruccion extends instruccion_1.Instruccion {
    constructor(id, expresion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
        this.tipoInstruccion = 'append';
    }
    ejecutar(env) {
        const val = this.expresion.ejecutar(env);
        let dymList = env.getDynamicList(this.id);
        if (dymList) {
            dymList.elementos.push(val);
        }
        else {
            throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList con id ${this.id}`);
        }
    }
}
exports.AppendInstruccion = AppendInstruccion;
