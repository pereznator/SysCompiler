"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Acceso extends expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    ejecutar(environment) {
        let value;
        value = environment.getVar(this.id);
        if (value) {
            return { valor: value.valor, tipo: value.tipo };
        }
        value = environment.getFuncion(this.id);
        if (value) {
            const val = value.ejecutar(environment);
            return { valor: val.valor, tipo: val.tipo };
        }
        value = environment.getVector(this.id);
        if (value) {
            return { valor: value, tipo: retorno_1.Tipo.ARRAY };
        }
        value = environment.getDynamicList(this.id);
        if (value) {
            return { valor: value, tipo: retorno_1.Tipo.ARRAY };
        }
        throw new error_1.Error_(this.linea, this.columna, 'Semantico', `No se encontro la variable '${this.id}'`);
    }
}
exports.Acceso = Acceso;
