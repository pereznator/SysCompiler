"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expresion_1 = require("../abstractas/expresion");
class Acceso extends expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    ejecutar(environment) {
        const value = environment.getVar(this.id);
        if (value == null || value == undefined)
            throw new Error("La variable no existe");
        return { valor: value.valor, tipo: value.tipo };
    }
}
exports.Acceso = Acceso;
