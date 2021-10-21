"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
class AccesoVector extends expresion_1.Expresion {
    constructor(id, posicion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.posicion = posicion;
        this.tipoInstruccion = 'acceso vector';
    }
    ejecutar(env) {
        var _a;
        const val = this.posicion.ejecutar(env);
        const vector = env.getVector(this.id);
        return (_a = vector) === null || _a === void 0 ? void 0 : _a.elementos[val.valor];
    }
}
exports.AccesoVector = AccesoVector;
