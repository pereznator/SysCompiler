"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
const retorno_1 = require("../abstractas/retorno");
const error_1 = require("../Error/error");
class Length extends expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.tipoExpresion = 'length';
    }
    ejecutar(env) {
        var _a, _b, _c;
        if (env.getVar(this.id)) {
            return { valor: (_a = env.getVar(this.id)) === null || _a === void 0 ? void 0 : _a.valor.length, tipo: retorno_1.Tipo.STRING };
        }
        else if (env.getDynamicList(this.id)) {
            return { valor: (_b = env.getDynamicList(this.id)) === null || _b === void 0 ? void 0 : _b.elementos.length, tipo: retorno_1.Tipo.STRING };
        }
        else if (env.getVector(this.id)) {
            return { valor: (_c = env.getVector(this.id)) === null || _c === void 0 ? void 0 : _c.elementos.length, tipo: retorno_1.Tipo.STRING };
        }
        throw new error_1.Error_(this.linea, this.columna, 'Sintactico', 'No se encontro la variable');
    }
}
exports.Length = Length;
