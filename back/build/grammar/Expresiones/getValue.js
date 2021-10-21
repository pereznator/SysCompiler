"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const error_1 = require("../Error/error");
class GetValue extends expresion_1.Expresion {
    constructor(id, posicion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.tipoExpresion = 'getvalue';
    }
    ejecutar(env) {
        const val = this.posicion.ejecutar(env);
        const dym = env.getDynamicList(this.id);
        if (dym) {
            const final = dym.elementos[val.valor];
            return { tipo: dym.tipo, valor: final };
        }
        throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro DynamicList ${this.id}`);
    }
}
exports.GetValue = GetValue;
