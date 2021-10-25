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
    tipoDominanteResta(tipo1, tipo2) {
        return TablaTipos_1.tiposResta[tipo1][tipo2];
    }
    tipoDominanteMulti(tipo1, tipo2) {
        return TablaTipos_1.tiposMulti[tipo1][tipo2];
    }
    tipoDominantePotencia(tipo1, tipo2) {
        return TablaTipos_1.tiposPotencia[tipo1][tipo2];
    }
}
exports.Expresion = Expresion;
