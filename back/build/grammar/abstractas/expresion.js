"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TablaTipos_1 = require("../Util/TablaTipos");
class Expresion {
    constructor(linea, columna) {
        this.linea = linea;
        this.columna = columna;
    }
    tipoDominante(tipo1, tipo2) {
        const type = TablaTipos_1.tipos[tipo1][tipo2];
        return type;
    }
}
exports.Expresion = Expresion;
